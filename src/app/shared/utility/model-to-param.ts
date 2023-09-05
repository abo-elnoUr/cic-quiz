import { HttpParams } from "@angular/common/http";

export class ModelToParam {

  public static convertModelToHttpParams(model: unknown): HttpParams {

    let params = new HttpParams()
    Object.entries(model).forEach(([k, v]) => {
      if(v != null)
        params = params.append(k, v);
    })
    return params;
  }
}
