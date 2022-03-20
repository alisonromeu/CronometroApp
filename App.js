import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [number, setNumber] = useState();
  const [button, setButton] = useState('Iniciar');
  const [ultimoRegistro, setUltimoRegistro] = useState(null);

  function iniciar() {
    if(timer !== null) {
      // parar o timer
      clearInterval(timer);
      timer = null;

      setButton('Iniciar');
    } else {
      // começar o timer
      timer = setInterval(() => {
        ss ++;

        if(ss == 60) {
          ss = 0;
          mm++;
        }

        if(mm == 60) {
          mm = 0;
          hh++;
        }

        // formatação da hora
        let format =
        (hh < 10 ? '0' + hh : hh) + ':' +
        (mm < 10 ? '0' + mm : mm) + ':' +
        (ss < 10 ? '0' + ss : ss);

        setNumber(format);

      }, 1000)

      setButton('Parar');
    }
  }

  function limpar() {
    if(timer !== null) {
      // parar o timer
      clearInterval(timer);
      timer = null;
    }

    setUltimoRegistro(number);

    setNumber('');
    ss = 0;
    mm = 0;
    hh = 0;

    setButton('Iniciar');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Cronomêtro</Text>

      <Image
        source={require('./src/crono.png')}
      />

      <Text style={styles.timer}>{number}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={ iniciar }>
          <Text style={styles.btnTexto}>{button}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress= { limpar }>
          <Text style={styles.btnTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaRegistro}>
        <Text style={styles.textoRegistro}>
          {ultimoRegistro ? 'Último Tempo: ' + ultimoRegistro : ''}
        </Text>
      </View>


    </View>
  );
}


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef',
  },
  title: {
    fontSize: 50,
    marginBottom: 80,
    color: '#000',
    textAlign: 'center',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  areaRegistro: {
    marginTop: 60,
  },
  textoRegistro: {
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic',
  },
})
