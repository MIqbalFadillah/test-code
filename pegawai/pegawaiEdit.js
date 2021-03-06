import React, { Component } from "react";

import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Button,
  Text,
  Platform,
  TouchableOpacity,
  ListView,
  ActivityIndicator
} from "react-native";

export default class EditStudentRecordActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TextInput_ID: "",
      TextInput_Nama: "",
      TextInput_Jk: "",
      TextInput_TglLahir: "",

    };
  }

  componentDidMount() {
    // Received Student Details Sent From Previous Activity and Set Into State.
    this.setState({
      TextInput_ID: this.props.navigation.state.params.ID,
      TextInput_Nama: this.props.navigation.state.params.NAMA,
      TextInput_Jk: this.props.navigation.state.params.JK,
      TextInput_TglLahir: this.props.navigation.state.params.DATE,
    });
  }

  static navigationOptions = {
    title: "EditStudentRecordActivity"
  };

  UpdateStudentRecord = () => {
    fetch("urlfetch", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pegawai_id: this.state.TextInput_ID,
        pegawai_nama: this.state.TextInput_Nama,
        pegawai_jk: this.state.TextInput_Jk,
        pegawai_tgl: this.state.TextInput_TglLahir,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server updating records.
        Alert.alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  };

  DeleteStudentRecord = () => {
    fetch("urldelete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        student_id: this.state.TextInput_ID
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);
      })
      .catch(error => {
        console.error(error);
      });

    this.props.navigation.navigate("PegawaiMain");
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 7 }}>
          {" "}
          Edit Student Record Form{" "}
        </Text>

        <TextInput
          placeholder="Nama Pegawai"
          value={this.state.TextInput_Nama}
          onChangeText={TextInputValue =>
            this.setState({ TextInput_Nama: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          placeholder="Jenis kelamin"
          value={this.state.TextInput_Jk}
          onChangeText={TextInputValue =>
            this.setState({ TextInput_Jk: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />

        <TextInput
          placeholder="Tanggal Lahir"
          value={this.state.TextInput_TglLahir}
          onChangeText={TextInputValue =>
            this.setState({ TextInput_TglLahir: TextInputValue })
          }
          underlineColorAndroid="transparent"
          style={styles.TextInputStyleClass}
        />


        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.UpdateStudentRecord}
        >
          <Text style={styles.TextStyle}> UPDATE DATA PEGWAI </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.TouchableOpacityStyle}
          onPress={this.DeleteStudentRecord}
        >
          <Text style={styles.TextStyle}> DELETE DATA PEGAWAI </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff"
  },

  MainContainer_For_Show_StudentList_Activity: {
    flex: 1,
    paddingTop: Platform.OS == "ios" ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
  },

  TextInputStyleClass: {
    textAlign: "center",
    width: "90%",
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: "#30cb63",
    borderRadius: 5
  },

  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: "90%",
    backgroundColor: "#30cb63"
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center"
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  }
});
