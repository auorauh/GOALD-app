import { StyleSheet, View, Text, Pressable } from 'react-native';

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
      },
      goalText: {
        padding: 10,
      },
      emptyGoal: {
        height: 115,
        width: 114,
        borderRadius: 15,
        borderWidth: 1,
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
        backgroundColor: '#58cc02'
      },
})