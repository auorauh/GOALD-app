import { View, TextInput, Button, StyleSheet, Modal, Text, Pressable, Keyboard} from 'react-native';
import { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function GoalInput(props) {
    const [goalTitle, setGoalText] = useState('');
    const [goalType, setType] = useState('objective');
    const [level, setLevel] = useState('Easy');

    function goalInputHandler(enteredText) {
        setGoalText(enteredText);
      }
    function addGoalHandler() {
        props.onAddGoal([goalTitle,goalType,level]);
        setGoalText('');
    }


    return (
        <Modal visible={props.visible} animationType="slide" >
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} 
                placeholder='New Goal Title'
                placeholderTextColor={'gray'}
                onChangeText={goalInputHandler}
                value={goalTitle} 
                selectionColor={'#d4af37'}
                required
                />
                <View style={styles.types}>
                <Pressable style={styles.typeChoice} onPress={() => {setType('daily'), Keyboard.dismiss()}}>
                  <FontAwesome5 style={[styles.typeText, goalType == 'daily' ? styles.dailySelected : styles.typeText]} name={'history'} /> 
                  <Text style={[styles.typeText, goalType == 'daily' ? styles.dailySelected : styles.typeText]}>Daily</Text>
                </Pressable>
                <Pressable style={styles.typeChoice} onPress={() => {setType('objective'), Keyboard.dismiss()}}>
                  <FontAwesome5 style={[styles.typeText, goalType == 'objective' ? styles.dailySelected : styles.typeText]} name={'bullseye'} /> 
                  <Text style={[styles.typeText, goalType == 'objective' ? styles.dailySelected : styles.typeText]}>Objective</Text>
                </Pressable>
                </View>
                <View style={styles.types}>
                  <Pressable style={styles.difficulty} onPress={() => {setLevel('Easy'), Keyboard.dismiss()}}>
                    <Text style={[styles.typeText, level == 'Easy' ? styles.easy : styles.typeText]}>Easy</Text>
                  </Pressable>
                  <Pressable style={styles.difficulty} onPress={() => {setLevel('Medium'), Keyboard.dismiss()}}>
                    <Text style={[styles.typeText, level == 'Medium' ? styles.medium : styles.typeText]}>Medium</Text>
                  </Pressable>
                  <Pressable style={styles.difficulty} onPress={() => {setLevel('Hard'), Keyboard.dismiss()}}>
                    <Text style={[styles.typeText, level == 'Hard' ? styles.hard : styles.typeText]}>Hard</Text>
                  </Pressable>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Cancel' onPress={props.cancel} color={'gray'}/>
                    </View>
                    <View style={styles.button}>
                        <Button title='Add Goal' onPress={addGoalHandler} color={'#d4af37'}/>
                    </View>
                </View>
            </View>
      </Modal>
      );
};

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        //backgroundColor: '#ffefd5',
        backgroundColor: '#0e1111',
      },
      textInput: {
        borderWidth: 1,
        borderColor: '#d4af37',
        width: '100%',
        padding: 8,
        color: 'gray',
        borderRadius: 6,
        marginBottom: 10,
        fontSize: '15'
      },
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
      },
      button: {
        width: '40%',
        marginHorizontal: 8,
      },
      types: {
        flexDirection: 'row',
        height: '10%',
        marginBottom: 10,
      },
      typeChoice: {
        borderWidth: 1,
        borderColor: '#d4af37',
        height: '100%',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
      },
      typeText: {
        color: 'gray',
        fontSize: '18'
      },
      dailySelected: {
        color: '#d4af37',
      },
      difficulty: {
        borderWidth: 1,
        borderColor: '#d4af37',
        height: '100%',
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
      },
      easy: {
        color: '#58cc02'
      },
      medium: {
        color: '#d4af37',
      },
      hard: {
        color: 'red',
      }
})