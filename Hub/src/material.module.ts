import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatInputModule} from '@angular/material/input'
import {MatCardModule} from '@angular/material/card'
import {MatSelectModule} from '@angular/material/select'
import {MatIconModule} from '@angular/material/icon'
import {MatBadgeModule} from '@angular/material/badge'
import {A11yModule} from '@angular/cdk/a11y';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule } from '@angular/material/snack-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
@NgModule({
    imports: [
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatBadgeModule,
    A11yModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatButtonToggleModule
    ],
    exports: [
        MatToolbarModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatSelectModule,
        MatIconModule,
        MatBadgeModule,
        A11yModule,
        MatMenuModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        MatRadioModule,
        MatButtonToggleModule
    ]
})
export class MaterialModule { }