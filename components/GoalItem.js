import { StyleSheet, View, Text, Pressable } from 'react-native';

function GoalItem(props){ 

    return (
    <Pressable onPress={props.onDeleteItem.bind(this, props.id)} style={({pressed}) => pressed && styles.pressedItem}>
        <View style={styles.goalItem}>
            <Text style={styles.goalText}>{props.value}</Text>
        </View>
    </Pressable>
    )

}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem:{
        padding: 8,
        margin: 6,
        borderRadius: 6,
        backgroundColor: '#d4af37',
      },
      goalText: {

      },
      pressedItem: {
        opacity: .3,
      }
})