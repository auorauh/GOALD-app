import { useState } from 'react';
import { StyleSheet, View, FlatList, Button, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goalModal, setGoalModal] = useState(false);
  const [goals, setGoals] = useState([]);

  function startAddGoal(){
    setGoalModal(true);
  }
  function cancelGoal(){
    setGoalModal(false);
  }

  function addGoalHandler(enteredText) {
    setGoals((currentGoals) => [...currentGoals, {text: enteredText, id:Math.random().toString()},]);
    cancelGoal();
  }
function deleteGoal(id){
  setGoals(goals  => {return goals.filter((goal) => goal.id !== id);})
}
  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Image style={styles.image} source={require('./assets/images/logo.png')}/>

      </View>
      <Button title='New Goal' color={'gray'} onPress={startAddGoal}/>
      {goalModal && <GoalInput onAddGoal={addGoalHandler} cancel={cancelGoal}/>}
      <View style={styles.goalsContainer}>
        <FlatList data={goals} renderItem={(itemData) => {
          return <GoalItem value={itemData.item.text} onDeleteItem={deleteGoal} id={itemData.item.id}/>;
        }}
        keyExtractor={(item,index) => {
          return item.id;
        }}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: '#0e1111',
    height: '100%',
    width: '100%',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderBottomColor: '#d4af37',
    marginBottom: 20,
  },
  goalsContainer: {

  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  }
});
