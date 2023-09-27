import {useEffect, useState} from 'react';
import {
  StatusBar,
  Modal,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';

import CustomButton from './Button';
import DatePicker from 'react-native-date-picker';

const Formulario = ({
  modalVisible,
  newDateHandler,
  pacientes,
  setPacientes,
  pacienteActualizado,
}) => {
  const [id, setId] = useState('');
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [date, setDate] = useState(new Date());
  const [sintomas, setSintomas] = useState('');

  useEffect(() => {
    if (Object.keys(pacienteActualizado).length > 0) {
      setId(pacienteActualizado.id);
      setPaciente(pacienteActualizado.paciente);
      setPropietario(pacienteActualizado.propietario);
      setEmail(pacienteActualizado.email);
      setTelefono(pacienteActualizado.telefono);
      setDate(pacienteActualizado.date);
      setSintomas(pacienteActualizado.sintomas);
    }
  }, [pacienteActualizado]);

  const handleAppointment = () => {
    if ([paciente, propietario, email, telefono, sintomas].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios', [
        {text: 'Aceptar'},
      ]);
      return; //para que no se registren pacientes con campos vacíos
    }

    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      date,
      sintomas,
    };

    // Revisar si el registro es nuevo o es para edicicón
    if (id) {
      // es para editar
      nuevoPaciente.id = id;
      const pacientesActualizados = pacientes.map(
        px => px.id === nuevoPaciente.id,
      );

      console.log(pacientesActualizados);
      return;
    } else {
      // Nuevo registro
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }

    clearFields();
    newDateHandler();
  };

  const clearFields = () => {
    setPaciente('');
    setPropietario('');
    setEmail('');
    setTelefono('');
    setDate(new Date());
    setSintomas('');
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <StatusBar backgroundColor={'#333'} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.title}>
              Nueva {''}
              <Text style={styles.titleBold}>Cita</Text>
            </Text>
          </View>

          <CustomButton
            title={'CANCELAR'}
            onPress={() => {
              newDateHandler();
            }}
            customColor={'#acbfa4'}
          />

          <View style={styles.group}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              value={paciente}
              onChangeText={setPaciente}
              style={styles.input}
              placeholder="Nombre paciente"
              placeholderTextColor={'#666'}
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              value={propietario}
              onChangeText={setPropietario}
              style={styles.input}
              placeholder="Nombre propietario"
              placeholderTextColor={'#666'}
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.label}>Email propietario</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              placeholder="Email propietario"
              placeholderTextColor={'#666'}
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.label}>Teléfono Propietaro</Text>
            <TextInput
              value={telefono}
              onChangeText={setTelefono}
              style={styles.input}
              keyboardType="phone-pad"
              placeholder="Teléfono propietario"
              placeholderTextColor={'#666'}
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.label}>Fecha</Text>

            <DatePicker date={date} textColor="#43aa8b" />
          </View>

          <View style={styles.group}>
            <Text style={styles.label}>Síntomas</Text>
            <TextInput
              value={sintomas}
              onChangeText={setSintomas}
              style={[styles.input, styles.inputSymptoms]}
              placeholder="Síntomas"
              multiline={true}
              placeholderTextColor={'#666'}
            />
          </View>
          <CustomButton
            title={'REGISTRAR CITA'}
            onPress={() => handleAppointment()}
            customColor={'#43aa8b'}
          />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfffc',
  },
  header: {
    flex: 1,
    margin: 20,
  },
  group: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#8ac926',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: 600,
  },
  input: {
    backgroundColor: '#f3f9d2',
    padding: 10,
    borderRadius: 12,
  },
  inputSymptoms: {
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 600,
    textAlign: 'center',
    color: '#8ac926',
  },
  titleBold: {
    fontWeight: '900',
  },
});

export default Formulario;
