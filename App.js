import { useEffect, useState, useForceUpdate } from 'react';
import { StyleSheet, View, FlatList, Button, Image, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goalModal, setGoalModal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [actualGoals, addActualGoal] = useState([]);
  const [score, setScore] = useState(0);
  const [allDone, setAllDone] = useState(false);

  function udpateGoals(){
    let tempGoals = [];
    for(let i=0;i<12;i++){
      if(actualGoals[i] != undefined){
        tempGoals[i] = actualGoals[i];
      } else {
        tempGoals[i] = {Title: null, id:i+1};
      }
    }
    allComplete();
    setGoals(tempGoals);
  }

  useEffect(() => {
    udpateGoals();
  },[])

  function startAddGoal(){
    setGoalModal(true);
  }
  function cancelGoal(){
    setGoalModal(false);
  }
  function completeGoal(id){
    for(let i=0;i<actualGoals.length;i++){
      if(actualGoals[i].id == id){
        if(actualGoals[i].Complete == false){
          switch(actualGoals[i].Difficulty){
            case 'Easy':
              setScore(score + 10);
              break;
            case 'Medium':
              setScore(score + 25);
              break;
            case 'Hard':
              setScore(score + 100);
              break;
          }
          actualGoals[i].Complete = true;
        } else {
          switch(actualGoals[i].Difficulty){
            case 'Easy':
              setScore(score - 10);
              break;
            case 'Medium':
              setScore(score - 25);
              break;
            case 'Hard':
              setScore(score - 100);
              break;
          }
          actualGoals[i].Complete = false;
        }
      }
    }
    udpateGoals();
  }
  function allComplete(){
    let complete = true
    if(actualGoals.length > 0){
      for(let i=0;i<actualGoals.length;i++){
        if(actualGoals[i].Complete === false){
          complete = false;
        }
      }
      setAllDone(complete);
    }

  }

  function addGoalHandler([enteredText,type,level]) {
    addActualGoal((currentGoals) => [{Title: enteredText, id:actualGoals.length+1, Complete: false, Type: type, Difficulty: level},...currentGoals,]);
    //setGoals((currentGoals) => [{Title: enteredText, id:actualGoals.length+1, Status: 'uncomplete'},...currentGoals,]);
    let tempGoals = [];
    let halfTempGoals = actualGoals
    halfTempGoals.unshift({Title: enteredText, id:actualGoals.length+1, Complete: false, Type: type, Difficulty: level});
    for(let i=0;i<12;i++){
      if(halfTempGoals[i] != undefined){
        tempGoals[i] = halfTempGoals[i];
      } else {
        tempGoals[i] = {Title: null, id:i};
      }
    }
    setGoals(tempGoals);
    cancelGoal();
    
  }
function deleteGoal(id){
  //setGoals(goals  => {return goals.filter((goal) => goal.id !== id);});
  addActualGoal(goals  => {return goals.filter((goal) => goal.id !== id);});
  let temp = [];
  let halfTemp = actualGoals.filter((goal) => goal.id !== id);
  //halfTemp.push({Title: null, id:halfTemp.length+1})
  for(let i=0; i<12;i++){
    if(halfTemp[i] != undefined){
      temp[i] = halfTemp[i];
    } else {
      temp[i] = {Title: null, id:i};
    }
  } 
  setGoals(temp);
}

  return (
    <>
    
    <StatusBar style='light'/>
    <View style={[styles.container, allDone == true ? styles.allComplete : styles.notComplete]}>
      <View style={styles.logoContainer}>
      <Image style={styles.image} source={require('./assets/images/logo.png')}/>
      <Text style={styles.scoreText}>Score: {score}</Text>

      </View>
      <View style={styles.addGoalBtn} title='New Goal' color={'gray'} onPress={startAddGoal}>
        <Button title='New Goal' color={'gray'} onPress={startAddGoal}/>
      </View>
      {goalModal && <GoalInput onAddGoal={addGoalHandler} cancel={cancelGoal}/>}
      <View style={styles.addGoalBtn}>
        <FlatList numColumns={3} data={goals} extraData={actualGoals} renderItem={(itemData) => {
          return <GoalItem value={itemData.item} onDeleteItem={deleteGoal} id={itemData.item.id} complete={completeGoal}/>;
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
    padding: 10,
    paddingTop: 40,
    backgroundColor: '#0e1111',
    height: '100%',
    width: '100%',
  },
  allComplete: {
    backgroundColor: '#0e1111',
    //backgroundColor: '#90EE90',
  },
  notComplete: {
    //backgroundColor: '#ffefd5',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    //borderBottomColor: 'gray',
    borderBottomColor: '#d4af37',
    
  },
  scoreText: {
    color: 'grey',
    marginBottom: 20,
  },
  goalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  addGoalBtn: {
    marginBottom: 5,
  },
  GoalSq: {
    height: 115,
    width: 115,
    borderRadius: 15,
    backgroundColor: '#d4af37',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
});
