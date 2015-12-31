# easy-jq-plugin
A simple library to easy the process of making jquery plugin

# Features
With this plugin, you can create your own jquery plugin 
1. $().your-plugin-name(): When no parameter is passed in, your plugin is initialized with default configuration
2. $().your-plugin-name(obj): When object parameter is passed in, object will be as new configuration to override your default configuration
3. $().your-plugin-name(str, obj): Pass string as method name in to call internal method with the name, and object is the configuration object
4. $().your-plugin-name(str, [arguments]): Pass string as method name in to call internal method with the name, and array is the configuration arguments

# Usage
Example can be found [here](http://beherca.github.io/easy-jq-plugin/example/)

