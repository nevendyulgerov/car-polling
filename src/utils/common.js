import Vue from 'vue';
import VBtn from 'vuetify/es5/components/VBtn';
import VOverflowBtn from 'vuetify/es5/components/VOverflowBtn';
import VIcon from 'vuetify/es5/components/VIcon';
import VTextField from 'vuetify/es5/components/VTextField';
import VSelect from 'vuetify/es5/components/VSelect';
import VAutocomplete from 'vuetify/es5/components/VAutocomplete';
import VTextarea from 'vuetify/es5/components/VTextarea';
import { Can } from '@casl/vue';
import AuthHeader from '../components/layout/header/Auth';
import LoggedHeader from '../components/layout/header/Logged';
import LoggedFrame from '../components/layout/LoggedFrame';
import AuthFrame from '../components/layout/AuthFrame';
import SingleFrame from '../components/layout/SingleFrame';
import AbsoluteBox from '../components/layout/AbsoluteBox';
import SectionHeader from '../components/layout/SectionHeader';
import Footer from '../components/layout/Footer.vue';
import Dialog from '../components/dialogs/Dialog';
import ConfirmDialog from '../components/dialogs/ConfirmDialog';
import AddDialog from '../components/dialogs/AddDialog';
import EditDialog from '../components/dialogs/EditDialog';
import Dropdown from '../components/dropdowns/Dropdown';
import ColorDropdown from '../components/dropdowns/Color';
import ColorLabel from '../components/labels/Color';
import TextEditor from '../components/TextEditor';
import Table from '../components/tables/Table';
import DatePicker from '../components/DatePicker';
import FileUpload from '../components/FileUpload';

Vue.component('v-btn', VBtn);
Vue.component('v-overflow-btn', VOverflowBtn);
Vue.component('v-icon', VIcon);
Vue.component('v-text-field', VTextField);
Vue.component('v-select', VSelect);
Vue.component('v-autocomplete', VAutocomplete);
Vue.component('v-textarea', VTextarea);
Vue.component('Can', Can);
Vue.component('layout-auth-header', AuthHeader);
Vue.component('layout-logged-header', LoggedHeader);
Vue.component('layout-absolute-box', AbsoluteBox);
Vue.component('layout-section-header', SectionHeader);
Vue.component('layout-footer', Footer);
Vue.component('layout-logged-frame', LoggedFrame);
Vue.component('layout-auth-frame', AuthFrame);
Vue.component('layout-single-frame', SingleFrame);
Vue.component('base-dialog', Dialog);
Vue.component('base-edit-dialog', EditDialog);
Vue.component('base-add-dialog', AddDialog);
Vue.component('base-text-editor', TextEditor);
Vue.component('base-table', Table);
Vue.component('base-dropdown', Dropdown);
Vue.component('dialog-confirm', ConfirmDialog);
Vue.component('dropdown-color', ColorDropdown);
Vue.component('label-color', ColorLabel);
Vue.component('base-date-picker', DatePicker);
Vue.component('base-file-upload', FileUpload);
