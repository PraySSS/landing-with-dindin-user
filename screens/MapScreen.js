import React, { Component } from 'react';
import { SafeAreaView, ScrollView,View } from 'react-native';
import ImageMapper from 'react-native-image-mapper';
import { RECTANGLE_MAP } from './MapData';

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAreaId: []
    };
  }

  mainImgWasPressed(item, idx, event) {
    console.log('Main');
    const { selectedAreaId } = this.state;
    if (Array.isArray(selectedAreaId)) {
      const indexInState = selectedAreaId.indexOf(item.id);
      if (indexInState !== -1) {
        console.log('Removing id', item.id)
        this.setState({
          selectedAreaId: [
            ...selectedAreaId.slice(0, indexInState),
            ...selectedAreaId.slice(indexInState + 1)
          ]
        });
      } else {
        alert(`This is MFU Mapping: ${item.id}`,);
        console.log('Setting Id', item.id)
        this.setState({ selectedAreaId: [...selectedAreaId, item.id] });
      }
    } else {
      if (item.id === selectedAreaId) {
        this.setState({ selectedAreaId: null });
      } else {
        this.setState({ selectedAreaId: item.id });
      }
    }
  }

  render() {
    return (<View style={{ flex: 1, alignItems: 'center', padding: 5 }}>
    <SafeAreaView>
      <ScrollView>
        <ScrollView horizontal={true}>
        <ImageMapper
            imgHeight={880}
            imgWidth={2159}
            imgSource={{
              uri:
                'https://www.img.in.th/images/919c243f91e61582d53bb67e54c22cd3.png',
            }}
            imgMap={RECTANGLE_MAP}
            onPress={(item, idx, event) => this.mainImgWasPressed(item, idx, event)}
            containerStyle={{ top: 5 }}
            selectedAreaId={this.state.selectedAreaId}
            multiselect /> 
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
    </View>
    );
  }
}

export default MapScreen;