import { ApplicationConfig, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { LucideAngularModule, Wheat, Apple, Fish, Droplet, Milk, Check, ArrowRight, TrendingUp, TrendingDown, Sparkles, ArrowLeft, Activity, Thermometer, Wind, Waves, ChevronDown, Globe, Menu, X, Download, Upload, Save, Trash2, Settings, BarChart3, LineChart, RefreshCw, Calendar, Clock, AlertTriangle, CheckCircle, Info, XCircle, FileText, FolderOpen, Search, Filter, MoreVertical, ChevronRight, Home, MapPin, Ship, Truck, Building2, Factory, Package, Users, ZoomIn, ZoomOut, Maximize2, Store, Warehouse, CloudRain, DollarSign, File, FileSpreadsheet } from 'lucide-angular';
import { CustomTranslateLoader } from './services/custom-translate-loader';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideEchartsCore({ echarts }),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        useDefaultLang: true,
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader
        }
      }),
      LucideAngularModule.pick({
        Wheat,
        Apple,
        Fish,
        Droplet,
        Milk,
        Check,
        ArrowRight,
        TrendingUp,
        TrendingDown,
        Sparkles,
        ArrowLeft,
        Activity,
        Thermometer,
        Wind,
        Waves,
        ChevronDown,
        Globe,
        Menu,
        X,
        Download,
        Upload,
        Save,
        Trash2,
        Settings,
        BarChart3,
        LineChart,
        RefreshCw,
        Calendar,
        Clock,
        AlertTriangle,
        CheckCircle,
        Info,
        XCircle,
        FileText,
        FolderOpen,
        Search,
        Filter,
        MoreVertical,
        ChevronRight,
        Home,
        MapPin,
        Ship,
        Truck,
        Building2,
        Factory,
        Package,
        Users,
        ZoomIn,
        ZoomOut,
        Maximize2,
        Store,
        Warehouse,
        CloudRain,
        DollarSign,
        File,
        FileSpreadsheet
      })
    )
  ]
};
