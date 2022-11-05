_
<template>
  <div>
    <v-data-table
      :no-data-text="$t('dataTable.NO_DATA')"
      :no-results-text="$t('dataTable.NO_RESULTS')"
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :server-items-length="totalItems"
      class="elevation-1"
      :footer-props="{
        'items-per-page-text': $t('dataTable.ROWS_PER_PAGE'),
        'items-per-page-options': [5, 10, 25]
      }"
    >
      <template v-slot:top>
        <v-layout wrap>
          <v-flex xs12 sm12 md4 mt-3 pl-4>
            <div class="text-left">
              <v-toolbar-title>Relatorios</v-toolbar-title>
            </div>
          </v-flex>
          <v-flex xs12 sm6 md4 px-3>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :label="$t('dataTable.SEARCH')"
              single-line
              hide-details
              clearable
              id="search"
              clear-icon="mdi-close"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md4 mb-2 mt-2 pr-2>
            <ValidationObserver
              ref="observer"
              v-slot="{ invalid }"
              tag="form"
              @submit.prevent="submit()"
            >
              <v-dialog
                v-model="dialog"
                max-width="500px"
                content-class="dlgNewEditItem"
              >
                <template v-slot:activator="{ on }">
                  <div class="text-right">
                    <v-btn color="secondary" v-on="on" class="btnNewItem">
                      <v-icon class="mr-2">mdi-plus</v-icon>
                      {{ $t('dataTable.NEW_ITEM') }}
                    </v-btn>
                  </div>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <template v-if="editedItem._id">
                          <v-flex xs12 md6>
                            <label for="createdAt">{{
                              $t('common.CREATED')
                            }}</label>
                            <div name="createdAt">
                              {{ getFormat(editedItem.createdAt) }}
                            </div>
                          </v-flex>
                          <v-flex xs12 md6>
                            <label for="updatedAt">{{
                              $t('common.UPDATED')
                            }}</label>
                            <div name="updatedAt">
                              {{ getFormat(editedItem.updatedAt) }}
                            </div>
                          </v-flex>
                        </template>
                        <v-flex xs12>
                          <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                          >
                            <v-text-field
                              requierd
                              id="name"
                              name="name"
                              v-model="editedItem.name"
                              :label="$t('cities.headers.NAME')"
                              :error="errors.length > 0"
                              :error-messages="errors[0]"
                              autocomplete="off"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red lighten3"
                      text
                      @click="close"
                      class="btnCancel"
                      >{{ $t('dataTable.CANCEL') }}</v-btn
                    >
                    <v-btn
                      color="green lighten3"
                      text
                      @click="save"
                      class="btnSave"
                      :disabled="invalid"
                      >{{ $t('dataTable.SAVE') }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </ValidationObserver>
          </v-flex>
        </v-layout>
      </template>
      <template v-slot:[`item._id`]="{ item }">
        <v-layout class="justify-center">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn id="edit" icon v-on="on" @click="editItem(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('dataTable.EDIT') }}</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn id="delete" icon v-on="on" @click="deleteItem(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>{{ $t('dataTable.DELETE') }}</span>
          </v-tooltip>
        </v-layout>
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        {{ getFormat(item.createdAt) }}
      </template>
      <template v-slot:[`item.updatedAt`]="{ item }">
        {{ getFormat(item.updatedAt) }}
      </template>
      <template
        v-slot:[`footer.page-text`]="{ pageStart, pageStop, itemsLength }"
      >
        {{ pageStart }} - {{ pageStop }}
        {{ $t('dataTable.OF') }}
        {{ itemsLength }}
      </template>
      <template v-slot:no-data>{{ $t('dataTable.NO_DATA') }}</template>
      <template v-slot:no-results>{{ $t('dataTable.NO_RESULTS') }}</template>
    </v-data-table>
    <ErrorMessage />
    <SuccessMessage />
  </div>
</template>

<script>
import { getFormat } from '@/utils/utils.js'

export default {
  metaInfo() {
    return {
      title: 'Relatorios',
      titleTemplate: `Relatorios - %s`
    }
  },
  data() {
    return {
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['name']
    }
  },
  computed: {
    formTitle() {
      return this.editedItem._id
        ? this.$t('dataTable.EDIT_ITEM')
        : this.$t('dataTable.NEW_ITEM')
    },
    headers() {
      return [
        {
          text: this.$i18n.t('dataTable.ACTIONS'),
          value: '_id',
          sortable: false,
          width: 100
        },
        {
          text: this.$i18n.t('cities.headers.NAME'),
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: this.$i18n.t('common.CREATED'),
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        {
          text: this.$i18n.t('common.UPDATED'),
          align: 'left',
          sortable: true,
          value: 'updatedAt'
        }
      ]
    },
    items() {
      return [
        {
          _id: '5d9f1b9b9c9d440000a2b2c8',
          name: 'Salamanca',
          createdAt: '2022-09-01T00:00:00.000Z',
          updatedAt: '2022-09-01T00:00:00.000Z'
        },
        {
          _id: '5d9f1b9b9c9d440000a2b2c9',
          name: 'Ctra. de Monterubio',
          createdAt: '2022-10-08T00:00:00.000Z',
          updatedAt: '2022-10-08T00:00:00.000Z'
        },
        {
          _id: '5d9f1b9b9c9d440000a2b2ca',
          name: 'Carbajosa de la Sagrada',
          createdAt: '2022-10-08T00:00:00.000Z',
          updatedAt: '2022-10-08T00:00:00.000Z'
        },
        {
          _id: '5d9f1b9b9c9d440000a2b2cb',
          name: 'Ctra. de Alba de Tormes',
          createdAt: '2022-10-08T00:00:00.000Z',
          updatedAt: '2022-10-08T00:00:00.000Z'
        },
        {
          _id: '5d9f1b9b9c9d440000a2b2cc',
          name: 'Ctra. de Alba de Tormes',
          createdAt: '2022-10-08T18:25:15.000Z',
          updatedAt: '2022-10-08T18:25:15.000Z'
        }
      ]
    },
    totalItems() {
      return this.items.length
    }
  },
  watch: {},
  methods: {
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'iii, MMMM d yyyy, h:mm a')
    }
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
