import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

import api from '../services/api';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
    const [opacity] = useState(new Animated.Value(0));

    useEffect(() => {

        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200
            })
        ]).start();



        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        })
    }, []);

    async function handleSubmit() {
        const response = await api.post('/auth/login', {
            email, password
        });

        const { access_token } = response.data;

        await AsyncStorage.setItem('user', access_token);

        navigation.navigate('List');
    };

    function changeAnimation(input) {
        if (input) {
            this.animation.play(0, 38);
        } else {
            this.animation.play(38, 60);
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <LottieView
                resizeMode="contain"
                autoSize
                loop={false}
                ref={animation => {
                    this.animation = animation;
                }}
                source={require('../../assets/1926-shy-wolf.json')}
            />

            <Animated.View style={[
                styles.form, {
                    opacity: opacity,
                    transform: [
                        {
                            translateY: offset.y
                        }

                    ]
                }
            ]}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#abc"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>PASSWORD *</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="senha"
                    placeholderTextColor="#abc"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={password}
                    onChangeText={setPassword}
                    onFocus={() => changeAnimation(true)}
                    onBlur={() => changeAnimation(false)}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.btnLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRegister}>
                    <Text style={styles.registerText}>Criar Conta Gratuita</Text>
                </TouchableOpacity>

            </Animated.View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191919',
        paddingBottom: 10
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        fontWeight: 'bold',
        color: '#faf',
        marginBottom: 8
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#575010',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 7
    },
    btnLogin: {
        height: 42,
        backgroundColor: '#f05a',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7
    },
    loginText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    btnRegister: {
        marginTop: 15,
        alignItems: 'center'
    },
    registerText: {
        color: '#fff'
    }
});