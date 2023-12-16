import React, { useState, useEffect } from "react";
import { IonInput, IonSelect, IonSelectOption, IonButton } from "@ionic/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../firebase/auth/AuthUserProvider";
import { useFirebaseAuth } from "../../firebase/auth/useFirebaseAuth";
import { useHistory } from "react-router";
import { AppointmentData } from "../../firebase/auth/useFirebaseAuth";

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
  const [selectedDoctorAppointments, setSelectedDoctorAppointments] = useState<
    AppointmentData[]
  >([]);
  const [doctorAppointments, setDoctorAppointments] = useState<
    AppointmentData[]
  >([]);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctors = await firebaseAuth.getDoctorData();

        const doctorAppointmentsData = await firebaseAuth.getAppointmentData();
        setDoctorAppointments(doctorAppointmentsData);

        if (selectedDoctor && selectedDate) {
          const selectedDoctorAppointments = doctorAppointmentsData.filter(
            (appointment) =>
              appointment.doctor === selectedDoctor &&
              appointment.date === selectedDate.toLocaleDateString()
          );
          setSelectedDoctorAppointments(selectedDoctorAppointments);
        }

        const specialtiesSet = new Set<string>();
        const doctorsList: string[] = [];

        doctors.forEach((doctor) => {
          specialtiesSet.add(doctor.specialty);
          doctorsList.push(doctor.name);
        });

        setUniqueSpecialties(Array.from(specialtiesSet));

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
  }, [firebaseAuth, selectedSpecialty, selectedDoctor, selectedDate]);

  useEffect(() => {
    const isSunday = selectedDate?.getDay() === 0;
    if (!isSunday) {
      const times = [];
      for (let hour = 9; hour <= 16; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeString = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;

          const isTimeSelected = selectedDoctorAppointments.some(
            (appointment) => appointment.time === timeString
          );

          if (!isTimeSelected) {
            times.push(timeString);
          }
        }
      }
      setAvailableTimes(times);
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, selectedDoctor, selectedDoctorAppointments]);

  useEffect(() => {
    setEmail(auth.user.email || null);
  }, [auth.user]);

  const handleSpecialtyChange = async (value: string | undefined) => {
    setSelectedSpecialty(value);

    const doctorsData = await firebaseAuth.getDoctorData();
    const doctors = doctorsData.filter((doctor) => doctor.specialty === value);
    setDoctorsBySpecialty(doctors.map((doctor) => doctor.name));

    setSelectedDoctor("");
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

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

    const isTimeAvailable = !doctorAppointments.find(
      (appointment) =>
        appointment.doctor === selectedDoctor &&
        appointment.date === selectedDate?.toLocaleDateString() &&
        appointment.time === selectedTime
    );

    if (!isTimeAvailable) {
      alert("The selected time is not available. Please choose another time.");
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
      await auth.addAppointment(appointmentData);

      setNameInput("");
      setSelectedSpecialty("");
      setSelectedDoctor("");
      setSelectedDate(null);
      setSelectedTime("");

      alert("Appointment created successfully!");
      history.push("/myAppointment");
    } catch (error) {
      console.error("Error adding appointment: ", error);
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
