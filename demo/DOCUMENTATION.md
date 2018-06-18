Components
----------

**app/components/custom/articles/articles.jsx**

### 1. Simple &#x60;List Of Articles&#x60; component.

WARNING: This is only the demo version to provide a sample data.   

Example:   
```js   
<Articles />   
```   




Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
showMore|bool|yes|false|
title|string|no||
-----
**app/components/button/button.jsx**

### 1. Button

A button clearly communicates what action will occur when the user touches it. It consists of text, an image, or both, designed in accordance with your app’s color theme.


```js
import {Button, IconButton} from 'react-toolbox/lib/button';

const GithubIcon = () => (
  <svg viewBox="0 0 284 277">
    <g><path d="M141.888675,0.0234927555 C63.5359948,0.0234927555 0,63.5477395 0,141.912168 C0,204.6023 40.6554239,257.788232 97.0321356,276.549924 C104.12328,277.86336 106.726656,273.471926 106.726656,269.724287 C106.726656,266.340838 106.595077,255.16371 106.533987,243.307542 C67.0604204,251.890693 58.7310279,226.56652 58.7310279,226.56652 C52.2766299,210.166193 42.9768456,205.805304 42.9768456,205.805304 C30.1032937,196.998939 43.9472374,197.17986 43.9472374,197.17986 C58.1953153,198.180797 65.6976425,211.801527 65.6976425,211.801527 C78.35268,233.493192 98.8906827,227.222064 106.987463,223.596605 C108.260955,214.426049 111.938106,208.166669 115.995895,204.623447 C84.4804813,201.035582 51.3508808,188.869264 51.3508808,134.501475 C51.3508808,119.01045 56.8936274,106.353063 65.9701981,96.4165325 C64.4969882,92.842765 59.6403297,78.411417 67.3447241,58.8673023 C67.3447241,58.8673023 79.2596322,55.0538738 106.374213,73.4114319 C117.692318,70.2676443 129.83044,68.6910512 141.888675,68.63701 C153.94691,68.6910512 166.09443,70.2676443 177.433682,73.4114319 C204.515368,55.0538738 216.413829,58.8673023 216.413829,58.8673023 C224.13702,78.411417 219.278012,92.842765 217.804802,96.4165325 C226.902519,106.353063 232.407672,119.01045 232.407672,134.501475 C232.407672,188.998493 199.214632,200.997988 167.619331,204.510665 C172.708602,208.913848 177.243363,217.54869 177.243363,230.786433 C177.243363,249.771339 177.078889,265.050898 177.078889,269.724287 C177.078889,273.500121 179.632923,277.92445 186.825101,276.531127 C243.171268,257.748288 283.775,204.581154 283.775,141.912168 C283.775,63.5477395 220.248404,0.0234927555 141.888675,0.0234927555" /></g>
  </svg>
);

const TestButtons = () => (
  <div>
    <Button href='http://github.com/javivelasco' target='_blank' raised>
      <GithubIcon /> Github
    </Button>
    <Button icon='bookmark' label='Bookmark' accent />
    <Button icon='bookmark' label='Bookmark' raised primary />
    <Button icon='inbox' label='Inbox' flat />
    <Button icon='add' floating />
    <Button icon='add' floating accent mini />
    <IconButton icon='favorite' accent />
    <IconButton icon={<GithubIcon />} accent />
    <IconButton primary><GithubIcon /></IconButton>
    <Button icon='add' label='Add this' flat primary />
    <Button icon='add' label='Add this' flat disabled />
  </div>
);
```

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
label|string|yes|Submit|Button label
width|number|no|500|Button width


-----
**app/components/dropdown/dropdown.jsx**

### 1. Dropdown

The Dropdown selects an option between multiple selections. The element displays the current state and a down arrow. When it is clicked, it displays the list of available options.


```js
import Dropdown from 'react-toolbox/lib/dropdown';

const countries = [
  { value: 'EN-gb', label: 'England' },
  { value: 'ES-es', label: 'Spain'},
  { value: 'TH-th', label: 'Thailand' },
  { value: 'EN-en', label: 'USA'}
];

class DropdownTest extends React.Component {
  state = { value: 'ES-es' };

  handleChange = (value) => {
    this.setState({value: value});
  };

  render () {
    return (
      <Dropdown
        auto
        onChange={this.handleChange}
        source={countries}
        value={this.state.value}
      />
    );
  }
}
```

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
source|array|yes|[1, 2, 3]|Elements
