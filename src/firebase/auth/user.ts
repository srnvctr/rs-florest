import {
  DocumentData,
  DocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export interface UserType {
  id: string | null;
  name: string | null;
  gender: string | null;
  email: string | null;
  number: string | null;
  address: string | null;
  myAppointment: string[];
  role: string | null;
}

export interface AppointmentData {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
}

export const userConverter = {
  toFirestore: (user: UserType) => {
    return {
      id: user.id,
      name: user.name,
      gender: user.gender,
      email: user.email,
      number: user.number,
      address: user.address,
      myAppointment: user.myAppointment,
      role: user.role,
    };
  },
  fromFirestore: (
    snapshot: DocumentSnapshot<DocumentData, DocumentData>,
    options: SnapshotOptions | undefined
  ) => {
    const data: DocumentData | undefined = snapshot.data(options);

    return {
      id: data!.id,
      name: data!.name,
      gender: data?.gender,
      email: data!.email,
      number: data?.number,
      address: data?.address,
      myAppointment: data?.myAppointment || [],
      role: data?.role,
    } as UserType;
  },
};
