import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from './Button';

const Paciente = ({item, setModalVisible, pacienteEditar}) => {
  const {paciente, propietario, sintomas, date, id} = item;

  const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha);
    const opciones = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return nuevaFecha.toLocaleDateString('es-ES', opciones);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Paciente</Text>
      <Text style={styles.texto}>{paciente}</Text>
      <Text style={styles.label}>Propietario</Text>
      <Text style={styles.texto}>{propietario}</Text>
      <Text style={styles.label}>Síntomas</Text>
      <Text style={styles.texto}>{sintomas}</Text>
      <Text style={styles.fecha}>{formatearFecha(date)}</Text>
      <View style={styles.botones}>
        <CustomButton
          title="Editar"
          onPress={() => {
            setModalVisible(true);
            pacienteEditar(id);
          }}
          customColor={'#333'}
        />
        <CustomButton
          title="Eliminar"
          onPress={() => {}}
          customColor={'#8f0f0f'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  label: {
    color: '#333',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  texto: {
    color: '#085409',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  fecha: {
    color: '#c94747',
  },
  botones: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
});

export default Paciente;
