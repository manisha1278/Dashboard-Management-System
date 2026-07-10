import { Injectable } from '@angular/core';
import { Dashboard } from '../models/dashboard';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Widget } from '../models/widgets';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  constructor(private http:HttpClient) {}
//Dashboards API's
  getDashboards(){         //used
    return this.http.get<Dashboard[]>(`${environment.apiUrl}/dashboard`);
  }

  addDashboard(name:string){ //used
    return this.http.post<Dashboard>(`${environment.apiUrl}/dashboard`,{    
      name:name
    });
  }

  updateDashboard(id:string,name:string){ //used
    return this.http.put<Dashboard>(`${environment.apiUrl}/dashboard/${id}`,{
      name:name
    });
  }

  deleteDashboard(id:string){   //used
    return this.http.delete(`${environment.apiUrl}/dashboard/${id}`);
  }
  getWidgets(dashboardId:string){
        return this.http.get<Widget[]>(`${environment.apiUrl}/dashboard/${dashboardId}/widget`);
  }
}
 
