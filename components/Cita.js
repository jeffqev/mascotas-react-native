import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, StyleSheet, View, TouchableHighlight } from "react-native";

function CIta({ item, deletePetByID }) {
  const handleDelete = (id) => {
    deletePetByID(id);
  };

  return (
    <View style={style.cita}>
      <View>
        <Text style={style.label}> Mascota: </Text>
        <Text style={style.list}> {item.pet} </Text>
      </View>
      <View>
        <Text style={style.label}> Propietario: </Text>
        <Text style={style.list}> {item.owner} </Text>
      </View>
      <View>
        <Text style={style.label}> Telefono: </Text>
        <Text style={style.list}> {item.phone} </Text>
      </View>
      <View>
        <Text style={style.label}> Fecha: </Text>
        <Text style={style.list}> {item.date} </Text>
      </View>
      <View style={style.mb15}>
        <Text style={style.label}> Sintoma: </Text>
        <Text style={style.list}> {item.symptoms} </Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => {
            handleDelete(item.id);
          }}
          style={style.deletebtn}
        >
          <Text style={style.deleteText}> Eliminar &times; </Text>
        </TouchableHighlight>
      </View>
      {/* <Button onPress={handleDelete} title="Eliminar" /> */}
    </View>
  );
}

const style = StyleSheet.create({
  deletebtn: {
    padding: 5,
    backgroundColor: "#E06C6D",
  },
  deleteText: {
    color: "#DFE5E5",
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
  },
  mb15: {
    marginBottom: 15,
  },
  list: {
    fontSize: 14,
    marginTop: 5,
    color: "#DFE5E5",
  },
  cita: {
    backgroundColor: "#333842",
    borderBottomColor: "#e1e1e1",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#DFE5E5",
    fontSize: 16,
    marginTop: 20,
  },
});
export default CIta;
