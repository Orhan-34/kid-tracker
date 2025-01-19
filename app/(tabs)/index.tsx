import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity, Animated, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [isFormActive, setIsFormActive] = useState(false);
  const slideAnimation = new Animated.Value(0);
  const fadeAnimation = new Animated.Value(0);
  const slideUpAnimation = new Animated.Value(height);
  const titleScaleAnimation = new Animated.Value(1);
  const titlePositionAnimation = new Animated.Value(0);
  const busPositionAnimation = new Animated.Value(0);
  const subtitleFadeAnimation = new Animated.Value(1);
  const busScaleAnimation = new Animated.Value(1);
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLoginPress = () => {
    Animated.parallel([
      Animated.timing(slideUpAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(titleScaleAnimation, {
        toValue: 0.7,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(titlePositionAnimation, {
        toValue: -height * 0.15,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(busPositionAnimation, {
        toValue: -height * 0.45,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(busScaleAnimation, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleFadeAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsFormActive(true);
    });
  };

  const handleRegisterPress = () => {
    Animated.parallel([
      Animated.timing(slideUpAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsFormActive(true);
    });
  };

  const handleBackPress = () => {
    Animated.parallel([
      Animated.timing(slideUpAnimation, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(titleScaleAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(titlePositionAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(busPositionAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(busScaleAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleFadeAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsFormActive(false);
    });
  };

  return (
    <LinearGradient
      colors={['#FF8008', '#FFA07A']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.contentContainer}>
        {isFormActive && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBackPress}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
        )}
        
        <Animated.View 
          style={[
            styles.headerContainer,
            {
              transform: [
                { scale: titleScaleAnimation },
                { translateY: titlePositionAnimation }
              ]
            }
          ]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleKid}>Kid</Text>
            <Text style={styles.titleTracker}>Tracker</Text>
          </View>
          <Animated.Text 
            style={[
              styles.subtitle,
              { opacity: subtitleFadeAnimation }
            ]}
          >
            Çocuğunuz güvende
          </Animated.Text>
        </Animated.View>
        
        <Animated.Image
          source={require('../../assets/images/school-bus.png')}
          style={[
            styles.busImage,
            {
              transform: [
                { translateY: busPositionAnimation },
                { scale: busScaleAnimation }
              ]
            }
          ]}
          resizeMode="contain"
        />

        <Animated.View 
          style={[
            styles.loginFormContainer,
            {
              opacity: fadeAnimation,
              transform: [{ 
                translateY: slideUpAnimation
              }]
            }
          ]}
        >
          <View style={styles.loginForm}>
            <TextInput
              style={styles.input}
              placeholder="E-posta"
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              placeholder="Şifre"
              placeholderTextColor="#666"
              secureTextEntry
            />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {!isFormActive && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLoginPress}
            >
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.registerButton} 
              onPress={handleRegisterPress}
            >
              <Text style={styles.registerButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: height * 0.05,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
    paddingTop: height * 0.08,
    zIndex: 1,
  },
  titleContainer: {
    alignItems: 'flex-start',
    marginBottom: height * 0.05,
    paddingLeft: width * 0.1,
  },
  titleKid: {
    fontSize: width * 0.15,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    lineHeight: width * 0.18,
    includeFontPadding: false,
    letterSpacing: 2,
  },
  titleTracker: {
    fontSize: width * 0.09,
    fontFamily: 'Poppins-Bold',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    lineHeight: width * 0.10,
    marginLeft: width * 0.2,
    marginTop: -width * 0.01,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#FFFFFF',
    opacity: 0.95,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 3,
    position: 'absolute',
    top: height * 0.30,
    alignSelf: 'center',
    textTransform: 'uppercase',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  busImage: {
    width: width * 0.7,
    height: width * 0.7,
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
    zIndex: 2,
  },
  buttonContainer: {
    width: width * 0.8,
    gap: 15,
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FF8008',
    fontSize: width * 0.045,
    fontFamily: 'Poppins-Bold',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontFamily: 'Poppins-Bold',
  },
  loginFormContainer: {
    position: 'absolute',
    width: width,
    bottom: 0,
    height: height * 0.6,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  loginForm: {
    padding: 20,
    paddingTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: width * 0.04,
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#FF8008',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.045,
    fontFamily: 'Poppins-Bold',
  },
  backButton: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
    zIndex: 1,
    padding: 10,
  },
}); 