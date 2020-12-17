  import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatSelectModule} from '@angular/material/select'
import {MatIconModule} from '@angular/material/icon'
import {MatBadgeModule} from '@angular/material/badge'
@NgModule({
    imports: [
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatBadgeModule
    ],
    exports: [
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatBadgeModule
    ]
})
export class MaterialModule { }