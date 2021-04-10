import { Dimensions, StyleSheet } from 'react-native'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const colors = {
  white: "#FFF",
  lightGray: "#F2F2F2",
  mediumGray: "#9E9E9E",
  borderGray: "#E1E1E1",
  darkGray: "#263238",
  black: "#000",
  primary: "#407BFF",
  secondary: "#33569B",
  bluePill: "#407BFF61",
  red: "#DF5753"
}

const text = StyleSheet.create({
  regular: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: colors.mediumGray
  },

  bold: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: colors.darkGray
  },

  primaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginLeft: 20,
    color: colors.white
  },

  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  currency: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.mediumGray
  },

  productPrice: {
    fontSize: 30,
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 3
  },

  goBackText: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.darkGray,
    marginLeft: 16
  },

  productDetailsName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginTop: 10
  },

  productDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.mediumGray
  },

  loginTitle: {
    fontSize: 30,
    color: colors.darkGray,
    textTransform: 'uppercase',
    marginBottom: 50
  },

  logoutText: {
    color: colors.white
  },

  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },

  deleteButtonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.red
  },

  editButtonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.primary
  },

  uploadButtonText: {
    color: colors.white,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },

  fileSize: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '300',
    padding: 2,
    marginVertical: 5
  },

  saveButtonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.primary
  }
})

const theme = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  card: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },

  draw: {
    width: 313,
    height: 225
  },

  textContainer: {
    paddingHorizontal: 20
  },

  primaryButton: {
    width: 290,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10
  },

  arrowContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: colors.secondary
  },

  // productCard

  scrollContainer: {
    padding: 10
  },

  productCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },

  productDescription: {
    width: '100%',
    padding: 20,
    borderTopColor: colors.lightGray,
    borderTopWidth: 1
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },

  productImg: {
    width: 140,
    height: 140,
    margin: 16
  },

  // SearchInput

  inputContainer: {
    width: '100%',
    height: 60,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 12.5,
    paddingVertical: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },

  searchInput: {
    width: '90%',
    height: 40,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderGray
  },

  detailsContainer: {
    backgroundColor: colors.white,
    padding: 20
  },

  detailCard: {
    width: '100%',
    height: '100%',
    // alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },

  goBackContainer: {
    width: 290,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10
  },

  productImgContainer: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 20
  },

  scrollTextContainer: {
    marginVertical: 20,
    padding: 20,
    borderWidth: 0.5,
    borderRadius: 20,
    borderColor: colors.lightGray
  },

  // Login Screen

  loginCard: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3
  },

  form: {
    marginVertical: 10
  },

  passwordGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25
  },

  textInput: {
    width: 290,
    height: 50,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    borderRadius: 10,
    padding: 10
  },

  toggle: {
    margin: -40
  },

  buttonContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around'
  },

  deleteButton: {
    width: '46%',
    height: 40,
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },

  editButton: {
    width: '46%',
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },

  // Admin Products Form

  formContainer: {
    width: deviceWidth,
    padding: 20
  },

  formCard: {
    width: '100%',
    height: '90%',
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  modalContainer: {
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#0003",
    alignItems: 'center',
    justifyContent: 'center'
  },

  modalContent: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalItem: {
    width: '100%',
    backgroundColor: colors.lightGray,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10
  },

  formInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    borderRadius: 10,
    padding: 10,
    marginVertical: 15
  },

  textArea: {
    width: '100%',
    // height: 200,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    borderRadius: 10,
    padding: 10,
    marginVertical: 15
  },

  selectInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center'
  },

  uploadButton: {
    width: '100%',
    height: 40,
    backgroundColor: colors.mediumGray,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },

  saveButton: {
    width: '46%',
    height: 40,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  }
})

const nav = StyleSheet.create({
  leftText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 20
  },

  drawer: {
    marginRight: 20
  },

  options: {
    width: deviceWidth,
    height: 120,
    backgroundColor: colors.primary,
    marginTop: 125,
    marginRight: -20,
    padding: 20,
    justifyContent: 'space-between'
  },

  option: {
    paddingVertical: 5
  },

  textOption: {
    color: colors.white,
    textTransform: 'uppercase'
  },

  textActive: {
    fontWeight: 'bold'
  },

  logoutBtn: {
    width: 60,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 10
  }
})

const tabbar = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: 80,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  pill: {
    padding: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 30
  },

  pillActive: {
    backgroundColor: colors.bluePill
  },

  pillText: {
    fontWeight: 'bold',
    color: colors.mediumGray
  },

  pillTextActive: {
    fontWeight: 'bold',
    color: colors.primary
  }
})

const admin = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center'
  },

  addButton: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    margin: 10
  }
})

export { colors, text, theme, nav, tabbar, admin }