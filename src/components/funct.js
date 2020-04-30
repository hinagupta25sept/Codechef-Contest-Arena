const fetcher = (endpoint, requestOptions) => {


    return fetch(endpoint + localStorage.getItem("accessToken"), requestOptions)
        .then(response => {
            response = response.json();
            if (response.status == 'error') {
                var myHeaders2 = new Headers();
                myHeaders2.append("Content-Type", "application/json");
                myHeaders2.append("Content-Type", "application/json");
                var raw1 = JSON.stringify({ "grant_type": "refresh_token", "refresh_token": + localStorage.getItem("refreshToken"), "client_id": "826e992304e7df9a274d697ba5aef447", "client_secret": "cfedc4fff1982ed80fb4a5d6d406fa58" });

                var requestOptions1 = {
                    method: 'POST',
                    headers: myHeaders2,
                    body: raw1,
                    redirect: 'follow'
                };

                return fetch("https://api.codechef.com/oauth/token", requestOptions1)
                    .then(response => response.json())
                    .then(res => res.result.data)
                    .then(data => {
                        localStorage.setItem("accessToken", data.access_token);
                        localStorage.setItem("refreshToken", data.refresh_token);
                    })
                    .then(
                        fetch(endpoint + localStorage.getItem("accessToken"), requestOptions).then(response => { return (response.json()); })
                    )
                    .catch(error => console.log('error', error));

            }
            else
                return response;
        })
        .catch(error => console.log("error", error));

};
export { fetcher };