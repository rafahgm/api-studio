use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct HttpRequest {
    method: String,
    url: String,
    headers: Vec<(String, String)>,
    body: Option<String>,
}

#[derive(Serialize)]
pub struct HttpResponse {
    status: u16,
    body: String,
}

#[tauri::command]
pub async fn execute_request(req: HttpRequest) -> Result<HttpResponse, String> {
    let client = Client::new();

    let mut request = client.request(req.method.parse().unwrap(), &req.url);

    for (key, value) in req.headers {
        request = request.header(&key, &value);
    }

    if let Some(body) = req.body {
        request = request.body(body)
    }

    let response = request.send().await.map_err(|e| e.to_string())?;

    let status = response.status().as_u16();
    let body = response.text().await.map_err(|e| e.to_string())?;

    Ok(HttpResponse { status, body })
}
