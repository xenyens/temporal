import React, {useCallback, useState} from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
} from 'react-native';

import Formulario from './components/Formulario';
import Paciente from './components/Paciente';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [pacienteActualizado, setPacienteActualizado] = useState({});

  const newDateHandler = () => {
    setModalVisible(false);
  };

  const pacienteEditar = id => {
    const pacienteEditado = pacientes.filter(paciente => paciente.id === id);
    setPacienteActualizado(pacienteEditado[0]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <View style={styles.header}>
        <Text style={styles.title}>
          Administrador de citas {''}
          <Text style={styles.titleBold}>Veterinaria</Text>
        </Text>
      </View>

      {pacientes.length === 0 ? (
        <Text style={styles.noPacientes}>No hay pacientes</Text>
      ) : (
        <FlatList
          style={styles.lista}
          data={pacientes}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                pacienteEditar={pacienteEditar}
              />
            );
          }}
        />
      )}

      <View style={styles.content}>
        <Pressable
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.buttonStyle}>
          <Text style={styles.buttonStyleText}>Nueva Cita</Text>
        </Pressable>
      </View>

      <Formulario
        modalVisible={modalVisible}
        newDateHandler={newDateHandler}
        pacientes={pacientes}
        setPacientes={setPacientes}
        pacienteActualizado={pacienteActualizado}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#e3f0de',
  },
  header: {},
  content: {
    marginTop: 15,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    textAlign: 'center',
  },

  titleBold: {
    fontWeight: 'bold',
    color: '#242e23',
  },
  buttonStyle: {
    padding: 15,
    backgroundColor: '#43aa8b',
    borderRadius: 12,
    marginHorizontal: 20,
  },
  buttonStyleText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 25,
    textTransform: 'uppercase',
  },
  lista: {
    flex: 4,
    margin: '10%',
  },
});

export default App;
