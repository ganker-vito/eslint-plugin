# eslint-plugin-assets

Helps check whether statically imported resources exist, Even if you use aliases or files starting width `.`

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-assets`:

```sh
npm install eslint-plugin-assets --save-dev
```

## Usage

Add `assets` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "assets"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "assets/check": "error"
    }
}
```
You can also use advanced(alias & extensions) configuration to config files you need check! 

```json
{
    "rules": {
        "assets/check": [
            "error", {
                alias: {'@': 'src'} // default,
                extensions: ['.png', '.jpg', '.jpeg', '.gif', '.svg'] // default
            }
        ]
    }
}
```


