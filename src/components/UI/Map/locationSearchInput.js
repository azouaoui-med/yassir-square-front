import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import { Typography, MenuItem } from '@material-ui/core';

export default class LocationSearchInput extends React.Component {
  state= {address: ''}


  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
        .then(latLng => { 
            this.props.onAddressChange(latLng, address);
        })
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <TextField
            {...getInputProps({
                autoFocus: true,
                margin:"dense",
                id:"standard-search",
                label:"Search field",
                type:"search",
                fullWidth: true,
                
            })}
            style={{margin:'20px', width:'200px'}}
            />
            <div>
                {loading && <MenuItem><Typography>Loading...</Typography></MenuItem>}
              {suggestions.map((suggestion,index) => {
                return (
                  <MenuItem
                    {...getSuggestionItemProps(suggestion)}
                    key={index}
                  >
                    {suggestion.description}
                  </MenuItem>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}