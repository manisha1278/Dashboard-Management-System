import { Injectable } from '@angular/core';
import { Dashboard } from '../models/dashboard';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  private readonly apiUrl = `${environment.apiUrl}/dashboard`;
  constructor(private http:HttpClient) {}
//Dashboards API's
  getDashboards(){         //used
    return this.http.get<Dashboard[]>(`${this.apiUrl}`);
  }

  addDashboard(name:string){ //used
    return this.http.post<Dashboard>(`${this.apiUrl}`,{    
      name:name
    });
  }

  updateDashboard(id:string,name:string){ //used
    return this.http.put<Dashboard>(`${this.apiUrl}/${id}`,{
      name:name
    });
  }

  deleteDashboard(id:string){   //used
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  getWidgets(dashboardId:string){
        return this.http.get<Widget[]>(`${this.apiUrl}/${dashboardId}/widget`);
  }
}
 
