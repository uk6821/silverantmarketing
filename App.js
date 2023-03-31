import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text, BackHandler, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useState, useEffect, useRef } from 'react';



export default function App() {

  const [loading, setLoading] = useState(false)

  const CustomActivityIndicator = () => {
    return (
      <View style={{ flex: 1,
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',}}>
        <ActivityIndicator color="#FF0000" size="large" />
      </View>
    );
  };

  const webRef = useRef(null)
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    const backAction = () => {

        if (canGoBack) {
            // console.log(webRef.current)
            webRef.current.goBack()
            
        } else {
          
            BackHandler.exitApp()
        }
        return true;

    };

    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
    );

    return () => backHandler.remove();
}, [canGoBack]);



  return (
    <View style={{ flex :1, marginTop:50, marginBottom:0, }}>
      <WebView style={{flex : 1}}
        source={{ uri: 'https://silverantmarketing.com' }}
        allowsInlineMediaPlayback
         ref={webRef}
        //  startInLoadingState={true}
        //  renderLoading={()=> <CustomActivityIndicator/>}
         onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
         onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack)
      }}
         > 
      </WebView>

      <StatusBar style='dark'   />
      {loading ? CustomActivityIndicator() : null}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 