import axios from "axios";
import { toast } from 'react-toastify';
const baseUrl = 'http://localhost:8000/'
export function SignUp(data) {
    return async (dispatch) => {
    axios.post(baseUrl + "auth/register", data,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(res => { 
            localStorage.setItem('authorData', JSON.stringify(res.data));
            toast.success('User registered successfully');
            window.location='/home'
        })
        .catch(error => {
            console.log(error)
            if(error.code=='ERR_BAD_REQUEST'){
                if(error.response.data.username){
                    error.response.data.username.forEach(element => {
                        toast.error(element);
                    });
                }
                if(error.response.data.email){
                    error.response.data.email.forEach(element => {
                        toast.error(element);
                    });
                }
            }
        })
    }
}

export function Login(data){
    return async (dispatch) => {
        axios.post(baseUrl + "auth/login", data,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(res => { 
                localStorage.setItem('authorData', JSON.stringify(res.data));
                toast.success('User login successfully');
                window.location='/home'
            })
            .catch(error => {
                if(error.code=='ERR_BAD_REQUEST'){
                    toast.error('Incorrect username or password')
                }
            })
        }
}

export function isTokenTxpired(data){
    return async (dispatch) => {
        axios.post(baseUrl + "auth/is_token_expired", data)
            .then(res => { 
                console.log(res.data);
               if(res.data.expired){
           localStorage.removeItem('authorData')
                window.location='/'
               }
            })
            .catch(error => {
                
            })
        }
}