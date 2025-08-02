import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-navbar',
    imports: [],
    template: `
        <nav class="navbar-header">
            <h1>
                <ng-content></ng-content>
            </h1>
        </nav>
    `,
    styles: `
        .navbar-header {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 8px 16px;
            color: white;
            background-color: var(--mat-sys-primary);
        }
    `
})
export class NavbarComponent {
    @Input() color: 'black' | 'red' | 'green' = 'black';
}
