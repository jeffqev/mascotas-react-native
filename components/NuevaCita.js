import React, { useState } from "react";
import shortid from "shortid";

import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function NuevaCita({ handleCreate, citas }) {
  // // TimePicker
  // const [time, setTime] = useState("");
  // const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  // const showTimePicker = () => {
  //   setTimePickerVisibility(true);
  // };

  // const hideTimePicker = () => {
  //   setTimePickerVisibility(false);
  // };

  // const handleConfirmTime = (time) => {
  //   console.log(moment(time).format());
  //   console.log("paso");
  //   hideTimePicker();
  // };

  const [pet, setPet] = useState("");
  const [owner, setOwner] = useState("");
  const [phone, setTelefono] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [date, setDate] = useState("");

  const handleConfirm = () => {
    if (
      pet.trim() === "" ||
      owner.trim() === "" ||
      phone.trim() === "" ||
      date.trim() === "" ||
      symptoms.trim() === ""
    ) {
      // Falla la validación
      mostrarAlerta();

      return;
    }

    const cita = { pet, owner, phone, date, symptoms };
    cita.id = shortid.generate();
    const citasNuevo = [...citas, cita];
    handleCreate(citasNuevo);
  };

  const mostrarAlerta = () => {
    Alert.alert("Error", "Todos los campos son obligatorios", [
      {
        text: "OK",
      },
    ]);
  };
  // DatePicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setDate(getDateString(date));
    hideDatePicker();
  };

  return (
    <ScrollView>
      <View style={style.containerForm}>
        <Text style={style.title}> Nuevo Paciente</Text>

        <Text style={style.label}> Mascota: </Text>
        <TextInput style={style.input} onChangeText={(text) => setPet(text)} />

        <Text style={style.label}> Propietario: </Text>
        <TextInput
          style={style.input}
          onChangeText={(text) => setOwner(text)}
        />

        <Text style={style.label}> Telefono: </Text>
        <TextInput
          style={style.input}
          keyboardType="numeric"
          onChangeText={(text) => setTelefono(text)}
        />

        <Text style={style.label}> Fecha: </Text>
        <View>
          <Button title="Dia" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            headerTextIOS="Elige una fecha"
          />
        </View>

        <Text style={style.datetime}> {date} </Text>

        <Text style={style.label}> Sintoma: </Text>
        <TextInput
          multiline
          style={style.inputMultiline}
          onChangeText={(text) => setSymptoms(text)}
        />

        <View>
          <TouchableHighlight
            onPress={() => {
              handleConfirm();
            }}
            style={style.confirmbtn}
          >
            <Text style={style.confirmText}> Agregar nueva cita </Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  confirmbtn: {
    padding: 5,
    backgroundColor: "#658250",
    marginVertical: 10,
  },
  confirmText: {
    color: "#DFE5E5",
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  datetime: {
    marginBottom: 3,
    padding: 1,
    color: "#DFE5E5",
  },
  containerForm: {
    paddingVertical: 40,
  },
  title: {
    color: "#DFE5E5",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  label: {
    color: "#DFE5E5",
    fontSize: 14,
  },
  input: {
    marginBottom: 6,
    height: 35,
    borderColor: "#e1e1e1",
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 5,
    color: "#fff",
  },
  inputMultiline: {
    marginBottom: 6,
    height: 65,
    borderColor: "#e1e1e1",
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 5,
    color: "#fff",
  },
});

function getDateString(date) {
  if (Platform.OS === "ios")
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  else {
    var dayOfWeek = [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",
      ],
      monthName = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",

        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      utc = date.getTime() + date.getTimezoneOffset() * 60000,
      US_time = utc + 3600000 * -4,
      US_date = new Date(US_time);

    return (
      dayOfWeek[US_date.getDay() - 1] +
      ", " +
      US_date.getDate() +
      " de " +
      monthName[US_date.getMonth()] +
      ", del " +
      US_date.getFullYear()
    );
  }
}
export default NuevaCita;
