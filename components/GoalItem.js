import { StyleSheet, View, Text, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function GoalItem(props){ 

    return (
    <Pressable onLongPress={props.onDeleteItem.bind(this, props.id)} style={({pressed}) => pressed && styles.pressedItem} onPress={props.complete.bind(this,props.id)}>
        {props.value.Title==null ? (
        <View style={styles.emptyGoal}>
            <Text style={styles.goalText}>{props.value.Title}</Text>
        </View>) 
        : (
        <View style={props.value.Complete? [styles.goalItem,styles.completeGoal] : styles.goalItem}>
            <Text style={styles.goalText}>{props.value.Title}</Text>
            {props.value.Type == 'daily' ? (
              <FontAwesome5 style={styles.goalText} name={'history'} />
            ) : (
              <FontAwesome5 style={styles.goalText} name={'bullseye'} />
            ) 
            }
            <Text>{props.value.Difficulty}</Text>
            
        </View>
        )}
    </Pressable>
    )

}


export default GoalItem;

const styles = StyleSheet.create({
    goalItem:{
        height: 115,
        width: 115,
        borderRadius: 15,
        backgroundColor: '#d4af37',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 23,
        marginTop: 25,
        justifyContent: 'space-around'
      },
      goalText: {
        padding: 0,
        fontSize: 15,
      },
      emptyGoal: {
        height: 115,
        width: 114,
        borderRadius: 15,
        borderWidth: 1,
        //borderColor: 'gray',
        borderColor: '#d4af37',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 24,
        marginTop: 25,
      },
      pressedItem: {
        opacity: .3,
      },
      completeGoal: {
        backgroundColor: '#0CCA4A'
        //backgroundColor: '#00FF7F'
        //backgroundColor: '#90EE90',
      },
})