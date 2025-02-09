<h1 align="center">LineTweet Coding Challenge</h1>

#### <p align="center">A task to develop a simple Express.js API that processes appointment data and  transforms it according to a set of predefined rules. 
</p>


## Project Setup and Running

Fetch the project from this repository by using `git checkout` to this url. When the project is downloaded to your local machine, enter the project root folder and enter the following command to install the necessary packages:

### `npm install`

After the packages are finished installing, you can start the app by executing the following commands (the second one will automatically restart the app after changes are being made, used for development mode):

### `npm start`, `npm run dev`

The app will start by default running on port 4000.

## Executing API Calls

The only valid endpoint to this project is the `"/"` route and it can only accept a valid JSON payload via the `POST` method:

```sh
## Structure
{
"name": string
"category": string,
"customerName": string,
"customerEmail": string
}

## Example
{
  "name": "service.EyeTest",
  "category": "ac_AC",
  "customerName": "Long Second Third Silver",
  "customerEmail": "john.doe@example.com"
}
```

*The fields `name` and `category` can only accept the following values

### `Name:`
- service.service
- service.augen
- service.EyeTest

### `Category:`

- ac_AC
- gl_GL
- cl_AC

The Expected result should look like this:
```sh
## Structure
{
  "services": string[],
  "customer": {
    "name": string,
    "lastName": string,
    "email": string
  },
  "title": string
}


## Example
{
  "services": [
    "augen"
  ],
  "customer": {
    "name": "Long Second Third",
    "lastName": "Silver",
    "email": "john.doe@example.com"
  },
  "title": "Long Second Third Silver"
}
```

## Errors

If the  validation criteria is not met or a route does not exist, and error message object with status code `400/404` should be returned: 
```sh
## Structure
{
  "errorMsg": string
}

## Validation Error
{
  "errorMsg": "The field 'name' is required"
}

## Route Missing
{
  "errorMsg": "Page not found"
}
```

## Author
### Martin Minchorov
