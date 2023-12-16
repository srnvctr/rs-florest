import React, { useState, useEffect } from "react";
import { IonInput, IonSelect, IonSelectOption, IonButton } from "@ionic/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../firebase/auth/AuthUserProvider";
import { useFirebaseAuth } from "../../firebase/auth/useFirebaseAuth";
import { useHistory } from "react-router";

import "./AppointmentForm.css";

const AppointmentForm: React.FC = () => {
  const auth = useAuth();
  const firebaseAuth = useFirebaseAuth();
  const history = useHistory();

  const [nameInput, setNameInput] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<
    string | undefined
  >("");
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [uniqueSpecialties, setUniqueSpecialties] = useState<string[]>([]);
  const [availableDoctors, setAvailableDoctors] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | undefined>("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [doctorsBySpecialty, setDoctorsBySpecialty] = useState<string[]>([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const doctors = await firebaseAuth.getDoctorData();
        const specialtiesSet = new Set<string>();
        const doctorsList: string[] = [];

        doctors.forEach((doctor) => {
          specialtiesSet.add(doctor.specialty);
          doctorsList.push(doctor.name);
        });

        setUniqueSpecialties(Array.from(specialtiesSet));

        // Filter doctors based on the selected specialty
        if (selectedSpecialty) {
          const filteredDoctors = doctors.filter(
            (doctor) => doctor.specialty === selectedSpecialty
          );
          setDoctorsBySpecialty(filteredDoctors.map((doctor) => doctor.name));
        } else {
          setDoctorsBySpecialty(doctorsList);
        }

        setAvailableDoctors(doctorsList);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [firebaseAuth, selectedSpecialty]);

  const handleSpecialtyChange = async (value: string | undefined) => {
    setSelectedSpecialty(value);

    // Set doctors based on the selected specialty
    const doctorsData = await firebaseAuth.getDoctorData();
    const doctors = doctorsData.filter((doctor) => doctor.specialty === value);
    setDoctorsBySpecialty(doctors.map((doctor) => doctor.name));

    // Clear selected doctor when changing specialty
    setSelectedDoctor("");
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  useEffect(() => {
    const isSunday = selectedDate?.getDay() === 0;
    if (!isSunday) {
      const times = [];
      for (let hour = 9; hour <= 16; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeString = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
          times.push(timeString);
        }
      }
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate]);

  useEffect(() => {
    setEmail(auth.user.email || null);
  }, [auth.user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !selectedSpecialty ||
      !selectedDoctor ||
      !selectedDate ||
      !selectedTime ||
      !nameInput
    ) {
      alert("Please fill in all fields");
      return;
    }

    const appointmentData = {
      id: "",
      userId: auth.user.id!,
      name: nameInput,
      email: auth.user.email!,
      doctor: selectedDoctor,
      specialty: selectedSpecialty,
      date: selectedDate?.toLocaleDateString(),
      time: selectedTime,
      status: "Pending",
      timestamp: new Date(),
    };

    try {
      // Add the appointment to Firebase
      await auth.addAppointment(appointmentData);

      // Reset form values
      setNameInput("");
      setSelectedSpecialty("");
      setSelectedDoctor("");
      setSelectedDate(null);
      setSelectedTime("");

      alert("Appointment created successfully!");
      history.push("/myAppointment")

    } catch (error) {
      console.error("Error adding appointment: ", error);

      // Show error alert
      alert("Failed to create appointment. Please try again.");
    }
  };

  return (
    <form className="AppointmentForm-Form" onSubmit={handleSubmit}>
      <section>
        <IonInput
          placeholder="Name"
          value={nameInput}
          onIonChange={(e) => {
            setNameInput(e.detail.value!);
          }}
        />
      </section>

      <section>
        <IonInput placeholder="Email" value={email || ""} readonly={true} />
      </section>

      <section>
        <IonSelect
          placeholder="Select Specialty"
          value={selectedSpecialty}
          onIonChange={(e) => {
            handleSpecialtyChange(e.detail.value);
            // setSelectedDoctor("");
          }}
        >
          {uniqueSpecialties.map((specialty) => (
            <IonSelectOption key={specialty} value={specialty}>
              {specialty}
            </IonSelectOption>
          ))}
        </IonSelect>
      </section>

      <section>
        <IonSelect
          placeholder="Select Doctor"
          disabled={!selectedSpecialty}
          value={selectedDoctor}
          onIonChange={(e) => setSelectedDoctor(e.detail.value)}
        >
          {doctorsBySpecialty.map((doctor) => (
            <IonSelectOption key={doctor} value={doctor}>
              {doctor}
            </IonSelectOption>
          ))}
        </IonSelect>
      </section>

      <section className="AppointmentForm-DateContainer">
        <DatePicker
          placeholderText="Select Date"
          className="AppointmentForm-Date"
          dateFormat="dd MMMM yyyy"
          selected={selectedDate}
          disabled={!selectedDoctor}
          onChange={handleDateChange}
        />
      </section>

      <section>
        <IonSelect
          placeholder="Select Time"
          disabled={!selectedDoctor || !selectedDate}
          value={selectedTime}
          onIonChange={(e) => setSelectedTime(e.detail.value)}
        >
          {availableTimes.map((time) => (
            <IonSelectOption key={time} value={time}>
              {time}
            </IonSelectOption>
          ))}
        </IonSelect>
      </section>

      <IonButton type="submit" className="AppointmentForm-SubmitBtn">
        SUBMIT
      </IonButton>
    </form>
  );
};

export default AppointmentForm;
