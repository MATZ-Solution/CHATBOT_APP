import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    appBarWrapper:{
        marginHorizontal:22,
        marginTop:42
    },
    appBar:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    location:{
        fontSize:16,
        fontWeight:'semibold'
    },
    cartCount:{
        position:'absolute',
        bottom:16,
        width:16,
        height:16,
        backgroundColor:'green',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        zIndex:999
    },
    cardNum:{
        fontSize:10,
        fontWeight:'semibold',
        color:'white'
    },
    welcomeContainer:{
        width:"100%"
    },
    welcomeText:{
        fontFamily:'bold',
        fontSize:32,
        color:'black',
        marginHorizontal:12
    },
    welcomeText1:{
        fontFamily:'bold',
        fontSize:32,
        color:'green',
        marginHorizontal:12,
       

    },
    searchContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"lightgrey",
        borderRadius:12,
        marginVertical:10,
        marginHorizontal:8,
        height:48,
    },
    searchIcon:{
        marginHorizontal:12,
        color:'red'
    },
    searchWrapper:{
        flex:1,
        backgroundColor:'lightgrey',
        marginRight:12,
        borderRadius:12,
    },
    searchInput:{
        fontFamily:'regular',
        // width:'100%',
        // height:'100%',
        paddingHorizontal:10
    },
    searchBtn:{
        width:48,
        backgroundColor:"green",
        height:"100%",
        alignItems:'center',
        justifyContent:'center',
        borderRadius:12
    },
    arrivalContainer:{
        width:'100%',
        paddingHorizontal:10
    },
    arivalHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    arivalText:{
        fontSize:18,
        fontWeight:"600"
    },
    productContainer:{
        marginTop:20
    },
    productImage:{
        width:"20%",
        height:30
    },
    renderContainer:{
        width:120,
        height:240,
        backgroundColor:"lightgray",
        marginEnd:10,
        borderRadius:10
    },
    imageContainer:{
        flex:1,
        width:115,
        marginLeft:2,
        marginTop:2,
        borderRadius:10,
        overflow:"hidden"

    },
    image:{
        aspectRatio:1,
        resizeMode:"cover"
    }
    

    });
export default styles;