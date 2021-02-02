import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Cita from "./components/Cita";
import NuevaCita from "./components/NuevaCita";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [citas, setCitas] = useState([
    // {
    //   id: "1",
    //   phone: 123123123,
    //   date: "no",
    //   pet: "Max",
    //   owner: "jeff",
    //   symptoms: "le duele la patita",
    // },
  ]);

  const deletePetByID = (id) => {
    setCitas((citas) => {
      return citas.filter((cita) => cita.id !== id);
    });
  };
  const handleShow = () => {
    setShowForm(!showForm);
  };

  const handleCreate = (cita) => {
    setCitas(cita);
    handleShow(!showForm);
  };

  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={() => handleCloseKeyboard()}>
      <View style={style.container}>
        <StatusBar style="auto" />
        <Text style={style.tittle}>MASCOTAS</Text>

        <TouchableHighlight
          onPress={() => {
            handleShow();
          }}
          style={style.showbtn}
        >
          <Text style={style.showbtnText}>
            {!showForm ? "Agregar nueva cita" : "Cerrar formulario"}
          </Text>
        </TouchableHighlight>

        <View style={style.main}>
          {showForm ? (
            <NuevaCita handleCreate={handleCreate} citas={citas} />
          ) : (
            <>
              <Text style={style.tittle}>
                {citas.length !== 0
                  ? "Citas Pendientes"
                  : "No hay citas pendientes "}
              </Text>
              <FlatList
                style={style.list}
                data={citas}
                renderItem={({ item }) => (
                  <Cita item={item} deletePetByID={deletePetByID} />
                )}
                keyExtractor={(cita) => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  tittle: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#DFE5E5",
    marginBottom: 10,
  },

  container: {
    backgroundColor: "#282C34",
    flex: 1,
  },
  main: {
    flex: 1,
    paddingHorizontal: "3.5%",
  },
  list: {
    flex: 1,
  },

  showbtn: {
    padding: 5,
    backgroundColor: "#333842",
    marginVertical: 10,
  },
  showbtnText: {
    color: "#DFE5E5",
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
});
