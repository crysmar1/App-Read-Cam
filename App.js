import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
// Resolver as permissões
import { check, request, PERMISSIONS, RESULTS } from '@react-native-permissions';

const App = () => {
  const [qrCodes, setQrCodes] = useState([]);

  useEffect(() => {
    const checkCameraPermission = async () => {
      // Verifica se a permissão de câmera foi concedida
      const permissionResult = await check(PERMISSIONS.IOS.CAMERA);

      if (permissionResult === RESULTS.DENIED) {
        // Se a permissão foi negada, solicita ao usuário
        const requestResult = await request(PERMISSIONS.IOS.CAMERA);

        if (requestResult !== RESULTS.GRANTED) {
          // Se a permissão não foi concedida, exibe um alerta
          Alert.alert(
            'Permissão negada',
            'Você precisa permitir o acesso à câmera para usar este aplicativo.'
          );
        }
      }
    };

    checkCameraPermission();
  }, []);

  const handleReadQrCode = ({ data }) => {
    // Adiciona o QR code lido à lista de QR codes
    setQrCodes(prevQrCodes => [...prevQrCodes, data]);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={handleReadQrCode}
        cameraStyle={styles.cameraContainer}
        cameraProps={{ flashMode: RNCamera.Constants.FlashMode.auto }}
      />
      <View style={styles.qrCodesContainer}>
        {qrCodes.map((qrCode, index) => (
          <Text key={index} style={styles.qrCodeText}>{qrCode}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  qrCodesContainer: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'stretch',
  },
  qrCodeText: {
    color: 'white',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default App;
