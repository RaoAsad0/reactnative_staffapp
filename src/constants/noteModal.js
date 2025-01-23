import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { color } from '../color/color';

const NoteModal = ({ visible, onAddNote, onCancel }) => {
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    onAddNote(noteText);
    setNoteText(''); 
  };

  return (
    <Modal 
      animationType="slide" 
      transparent={true} 
      visible={visible} 
    //   onRequestClose={onCancel} 
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add Note</Text>
          <TextInput
            style={styles.noteInput}
            multiline={true}
            numberOfLines={4}
            onChangeText={setNoteText}
            value={noteText}
            selectionColor={color.selectField_CEBCA0}
          />
          <View style={styles.buttonContainer}>
            {/* <Button title="Cancel" onPress={onCancel} /> */}
            <Button title="Add" onPress={handleAddNote} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: 130
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: '#3C200A',
    fontSize: 18,
    fontWeight: 'bold'
    
  },
  noteInput: {
    borderWidth: 1,
    borderColor: '#CEBCA0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '100%', 
    color: color.black_544B45,
  },
  buttonContainer: {
    width: '100%', 
  },
});

export default NoteModal;