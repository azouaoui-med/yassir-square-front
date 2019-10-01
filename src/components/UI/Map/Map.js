import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { Paper, IconButton, Divider} from '@material-ui/core';
import axios from '../../../axios.js';
import mousetrap from 'mousetrap';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import Drawer from './Drawer';


const GoogleMapReact = withGoogleMap(({children, ...props}) =>
    <GoogleMap
        zoom={props.zoom}
        center={props.center}
        {...props}
    >
        {children}
    </GoogleMap>
);

const DEFAULT_CENTER = {
    lat: 36.7563368,
    lng: 3.0551159000000325,
};


const getPolygonCenter = (path) => {
    if (window.google && window.google.maps) {
        const bounds = new window.google.maps.LatLngBounds();
        path.forEach((element) => bounds.extend(element));
        return bounds.getCenter();
    }
};
const geojsonToLatLng = (geojson) => {

    return {lat:geojson[1] ,lng:geojson[0] };
};
const latLngToGeojson = (latLng) => {
    
    const lat = parseFloat(latLng.lat.toFixed(6));
    const lng = parseFloat(latLng.lng.toFixed(6));
    return [ lng, lat  ]  ;
};

const octagonPath = ({lat, lng}) => {
    return [
                {lat:lat-0.003,lng:lng-0.002},
                {lat:lat-0.003,lng:lng+0.002},
                {lat:lat-0.002,lng:lng+0.004},
                {lat:lat+0.002,lng:lng+0.004},
                {lat:lat+0.003,lng:lng+0.002},
                {lat:lat+0.003,lng:lng-0.002},
                {lat:lat+0.002,lng:lng-0.004},
                {lat:lat-0.002,lng:lng-0.004}
        ];
}
const increasePolygon = (coordinates) => {
    const path = [];
    path[0] = {lat:coordinates[0].lat-0.0003,lng:coordinates[0].lng-0.0002}
    path[1] = {lat:coordinates[1].lat-0.0003,lng:coordinates[1].lng+0.0002}
    path[2] = {lat:coordinates[2].lat-0.0002,lng:coordinates[2].lng+0.0004}
    path[3] = {lat:coordinates[3].lat+0.0002,lng:coordinates[3].lng+0.0004}
    path[4] = {lat:coordinates[4].lat+0.0003,lng:coordinates[4].lng+0.0002}
    path[5] = {lat:coordinates[5].lat+0.0003,lng:coordinates[5].lng-0.0002}
    path[6] = {lat:coordinates[6].lat+0.0002,lng:coordinates[6].lng-0.0004}
    path[7] = {lat:coordinates[7].lat-0.0002,lng:coordinates[7].lng-0.0004}
    return path;
}

const decreasePolygon = (coordinates) => {
    const path = [];
    path[0] = {lat:coordinates[0].lat+0.0003,lng:coordinates[0].lng+0.0002}
    path[1] = {lat:coordinates[1].lat+0.0003,lng:coordinates[1].lng-0.0002}
    path[2] = {lat:coordinates[2].lat+0.0002,lng:coordinates[2].lng-0.0004}
    path[3] = {lat:coordinates[3].lat-0.0002,lng:coordinates[3].lng-0.0004}
    path[4] = {lat:coordinates[4].lat-0.0003,lng:coordinates[4].lng-0.0002}
    path[5] = {lat:coordinates[5].lat-0.0003,lng:coordinates[5].lng+0.0002}
    path[6] = {lat:coordinates[6].lat-0.0002,lng:coordinates[6].lng+0.0004}
    path[7] = {lat:coordinates[7].lat+0.0002,lng:coordinates[7].lng+0.0004}
    return path;
}


export default class FormDialog extends React.Component {
    constructor(props){
        super(props);
        const coordinates  =  props.value ? this.props.value.location.coordinates[0].filter((item, index) => index !== 0) : [];
        axios.get(`${process.env.REACT_APP_API_URL}/user`)
            .then(response =>  this.setState({country : response.data.country_code}));
        this.state = {
            open: false,
            center: props.value ? getPolygonCenter(coordinates.map(geojson => geojsonToLatLng(geojson))) : DEFAULT_CENTER,
            path: props.value ? coordinates.map(geojson => geojsonToLatLng(geojson)): octagonPath(DEFAULT_CENTER),
            validPath: props.value ? coordinates.map(geojson => geojsonToLatLng(geojson)): null,
            address: props.value ? props.value.address : '',
            zoom:12,
            selected: false,
            title:'',
            name:'',
            description: '',
            image:'',
            location:{lat:0,lng:0},
            places : []

        };
        axios.get("/tags/list")
            .then((res) => {
                console.log(res.data.map(p => p.place))
                this.setState({places: res.data.map(p => p.place)})
            })
                
        

       

        
    }

    static getDerivedStateFromProps(props, state){
        const coordinates  =  props.value ? props.value.location.coordinates[0].filter((item, index) => index !== 0) : [];

        if (props.value !== state.prevProps){
            return {
                center: props.value ? getPolygonCenter(coordinates.map(geojson => geojsonToLatLng(geojson))) : DEFAULT_CENTER,
                path: props.value ? coordinates.map(geojson => geojsonToLatLng(geojson)): octagonPath(DEFAULT_CENTER),
                validPath: props.value ? coordinates.map(geojson => geojsonToLatLng(geojson)): null,
                address: props.value ? props.value.address : '',
                prevProps: props.value,
            }
        }
        return null;

    
    }
    
    handleClickOpen = () => {
        this.setState({ open: true } );
        mousetrap.bind(['ctrl+alt+plus','command+option+plus'],(e) => {
            const path = increasePolygon(this.state.path);
            this.setState({ path });
             
        });
        mousetrap.bind(['ctrl+alt+-','command+option+-'],(e) => {
            const path = decreasePolygon(this.state.path);
            this.setState({ path });
             
        });
    };
    
    handleClose = name => () => {
        switch (name) {
            case 'select':
                
                this.setState({selected: true});
                axios.post("/tags/create" ,{image: this.state.image,location: this.state.location,title: this.state.title, name:this.state.name, description: this.state.description})
                
                
                break;
            case 'cancel':
               break;

            default:
                break;
        }
        
        this.setState({ open: false });
        mousetrap.unbind(['ctrl+alt+plus','command+option+plus']);
        mousetrap.unbind(['ctrl+alt+-','command+option+-']);
    };

    handleReset = () => {
        this.setState({path: null, center:'', address: '', validPath:''});
        this.props.onValueChange();
    };
    
    handleAddressChange = (path) => {
        const latlng = getPolygonCenter(path);
        const google = window.google;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location':latlng}, (result, status) => {
            if (status === 'OK') {
                const address = result[0].formatted_address;
                this.setState({ address  });

                let coordinates =[[]];
                coordinates[0] = path.map(latlng=> latlng.toJSON()).map(point => latLngToGeojson(point));

                this.props.onValueChange({address,location:{ type: "Polygon", coordinates}});
            }
        });
    };

    onAddressChange = (center,address) => {
        const path = octagonPath(center);
        this.setState({center, address, path, zoom:15});
    };

    

    setChoosenPolygon = (zoom) => (response) => {
        if (response.data){
            let maxLength = -Infinity;
            let maxIndex = 0;
            response.data.forEach((v,i) => {
                if (v[0].length > maxLength){
                    maxLength = v[0].length;
                    maxIndex = i;
                }
            });
            const path = response.data[maxIndex][0].map(geojson => geojsonToLatLng(geojson));
            const center = getPolygonCenter(path);
            this.setState({path, center, zoom});
        }
        
    };
    
    onChoose = () => {
        const {town, district, state, country} = this.state
        if (town){
            axios.get(`${process.env.REACT_APP_API_URL}/countries/3/${town},${district},${state},${country},0`)
                .then(this.setChoosenPolygon(15)); 
        }else {
            if (district){
                axios.get(`${process.env.REACT_APP_API_URL}/countries/2/${district},${state},${country},0`)
                    .then(this.setChoosenPolygon(12));

            }else{
                if(state){
                    axios.get(`${process.env.REACT_APP_API_URL}/countries/1/${state},${country},0`)
                        .then(this.setChoosenPolygon(10));
                }
            }
        }
    }

    handleApiLoaded = (map, maps) => {
        console.log("amine")
        
        maps.event.addListener(
            map,
            "rightclick",
            function( event ) {
                // use JS Dom methods to create the menu
                // use event.pixel.x and event.pixel.y 
                // to position menu at mouse position
                console.log( event );
            }
        );
      }

    onMapClick = (event) =>{
        this.setState((prevState) => ({ open : !prevState.open, location:{lat:event.latLng.lat(), lng:event.latLng.lng()}}))
    }

    handleChange = name => event => {
        let { value } = event.target
        this.setState((prevState) => ({ [name] : value }) );
    }
    
 
    
    render() {
        let states = require('../../../geo-levels/sublevel1.json');
        if (this.state.country){
            states = states.filter( s => s.sublevel0.sublevel0_id === this.state.country.toString())
        }
        
        let districts = [];
        let towns = [];
        if (this.state.state){
            districts = require('../../../geo-levels/sublevel2.json');
            districts = districts.filter( d => d.sublevel1.sublevel1_id === this.state.state );
        }
        if (this.state.district){
            towns = require('../../../geo-levels/sublevel3.json');
            towns = towns.filter( t => t.sublevel2.id === this.state.district )
        }
            return (   
                <Paper style={{ height:'920px'}} >

                  
                    <Drawer places={this.state.places}/>
                    <GoogleMapReact
                        onClick={this.onMapClick}
                        zoom={this.state.zoom}
                        center={this.state.center}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}

                    >
                        <Marker position={DEFAULT_CENTER} />
                    </GoogleMapReact>

                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        maxWidth='lg'
                        
                    >
                        <DialogContent>
                            
        
                        <TextField margin='dense' multiline rows="2" label='Title' value={this.state.title} fullWidth onChange={this.handleChange('title')}  />
                        <TextField margin='dense' multiline rows="2" label='Place Name'  value={this.state.name} fullWidth onChange={this.handleChange('name')}   />
                        <TextField margin='dense' multiline rows="2" label='Description'  value={this.state.description} fullWidth onChange={this.handleChange('description')} />
                        <TextField margin='dense' multiline rows="2" label='Image'  value={this.state.image} fullWidth onChange={this.handleChange('image')} />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose('cancel')} color="primary">
                                Cancel
                            </Button>
                            <Button  onClick={this.handleClose('select')} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            );
        }
}
