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

export function createBook(data){
    return async (dispatch) => {
    const headers = {
        Authorization: `Bearer ${data.accessToken}`,
        'Content-Type': 'multipart/form-data'
      };

      axios
      .post(baseUrl+'/home/create_book/', data, { headers })
      .then((response) => {
        toast.success('Book created successfully')
      })
      .catch((error) => {
       if(error.response.data.detail){
        toast.error(error.response.data.detail)
       }else{
        toast.error('error occur try again')
       }
      });
    }
  
}

export function getDetailsBook(data){
    return async (dispatch) => {
          axios
      .get(baseUrl+`/home/book_detail/${data.pk}/`)
      .then((response) => {

        dispatch({
            type: "BOOKDETAIL",
            payload: response.data
          });
      })
      .catch((error) => {
       if(error.response.data.detail){
        toast.error(error.response.data.detail)
       }else{
        toast.error('error occur try again')
       }
      });
    }
}

export function updateBook(data){
    return async (dispatch) => {
        const headers = {
            Authorization: `Bearer ${data.accessToken}`,
            'Content-Type': 'multipart/form-data'
          };
          axios
        .put(baseUrl+`/home/book_update/${data.pk}/`,data,{headers})
      .then((response) => {
        toast.success('Book updated successfully')
        dispatch({
            type: "BOOKDETAIL",
            payload: response.data
          });
      })
      .catch((error) => {
       if(error.response.data.detail){
        toast.error(error.response.data.detail)
       }else{
        toast.error('error occur try again')
       }
      });
    }
}


export function getBooks(currentPage){
    return async (dispatch) => {
        axios.get(baseUrl+`/home/books/?page=${currentPage}`).then((response)=>{

            dispatch({
                type: "BOOKS",
                payload: response.data
              });
        }).catch((error)=>{
            console.log(error);
            toast.error('error occur try again')
        })
    }

}

export function getPages(currentPage,id_book){
    return async (dispatch) => {
        axios.get(baseUrl+`/home/page_list/${id_book}/?page=${currentPage}`).then((response)=>{
            dispatch({
                type: "PAGES",
                payload: response.data
              });
        }).catch((error)=>{
            console.log(error);
            toast.error('error occur try again')
        })
    }

}

export function createPage(data,props){
    return async (dispatch) => {
        const headers = {
            Authorization: `Bearer ${data.accessToken}`,
            'Content-Type': 'multipart/form-data'
          };
        axios.post(baseUrl+`/home/page_create/`,data,{headers}).then((response)=>{
            toast.success('Page created successfully')
            props.getPages(data.cuurentPage,data.book)
        }).catch((error)=>{
            console.log(error);
            toast.error('error occur try again')
        })
    }

}

export function updatePage(data,props){
    return async (dispatch) => {
        const headers = {
            Authorization: `Bearer ${data.accessToken}`,
            'Content-Type': 'multipart/form-data'
          };
        axios.put(baseUrl+`/home/page_update/${data.pk}/`,data,{headers}).then((response)=>{
            toast.success('Page updated successfully')
            props.getPages(data.cuurentPage,data.book)
        }).catch((error)=>{
            console.log(error);
            toast.error('error occur try again')
        })
    }

}

export function deletePage(data,props){
    return async (dispatch) => {
        const headers = {
            Authorization: `Bearer ${data.accessToken}`,
            'Content-Type': 'multipart/form-data'
          };
        axios.delete(baseUrl+`/home/page_delete/${data.pk}/`,{headers}).then((response)=>{
            toast.success('Page deleted successfully')
            props.getPages(data.cuurentPage,data.book)
        }).catch((error)=>{
            console.log(error);
            toast.error('error occur try again')
        })
    }

}
