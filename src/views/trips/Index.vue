<template>
  <div data-view="trips">
    <!--
    <AddBeerDialog
      :is-on="isAddTripModalOn"
      :is-loading="isAddingTrip"
      :on-cancel="toggleNewTripModal"
      :on-confirm="createTrip"
    />

    <EditBeerDialog
      :beer="selectedTrip"
      :is-on="isEditTripModalOn"
      :is-loading="isEditingTrip"
      :on-cancel="toggleEditTripModal"
      :on-confirm="updateTrip"
    />
    -->

    <layout-logged-frame>
      <template slot="aside">
        <TripFilters
          @filter="onFilter"
          @clearFilters="onClearFilters"
        />
      </template>
      <template slot="content">
        <base-table
          :columns="columns"
          :items="trips"
          :pages="totalPages"
          :pagination="pagination"
          :can-edit-columns="false"
          :has-custom-items-template="true"
          :is-loading="isLoading"
          :on-select-item="selectTrip"
          :on-update-pagination="updatePagination"
        >
          <template slot="title">
            <h1>{{ 'Trips' }}</h1>
            <span class="heading-separator">
              {{ ' / ' }}
            </span>
            <h2>{{ totalCount }}</h2>
          </template>

          <template
            slot="item-cell"
            slot-scope="scope"
          >
            <div v-if="scope.cell.column.value === 'picture'">
              <v-img
                :src="scope.cell.item.picture"
                class="elevation-2"
              />
            </div>
            <div v-else>
              {{ displayColumnValue(scope.cell.item, scope.cell.column.value) }}
            </div>
          </template>

          <template slot="actions">
            <v-btn
              class="trigger add-new-item elevation-4"
              color="secondary"
              @click="toggleNewTripModal"
            >
              <v-icon>
                local_drink
              </v-icon>
              {{ 'Add new trip' }}
            </v-btn>
          </template>
        </base-table>
      </template>
    </layout-logged-frame>
  </div>
</template>

<script>
  import TripFilters from '../../components/forms/filters/Trips';
  import AddBeerDialog from '../../components/dialogs/beers/AddDialog';
  import EditBeerDialog from '../../components/dialogs/beers/EditDialog';
  import { extractNestedProp, isStr } from '../../utils';
  import columns from '../../config/trips/columns';

  export default {
    components: {
      AddBeerDialog,
      EditBeerDialog,
      TripFilters
    },
    data() {
      return {
        columns,
        pagination: {
          descending: true,
          page: 1,
          rowsPerPage: 15,
          sortBy: 'origin',
          totalItems: 0,
          search: ''
        },
        selectedTrip: {},
        totalPages: 0,
        query: {},
        isEditTripModalOn: false,
        isEditingTrip: false,
        isAddTripModalOn: false,
        isAddingTrip: false,
        isLoading: false
      };
    },
    computed: {
      trips() {
        return this.$store.getters['trips/items'];
      },
      totalCount() {
        return this.trips.length;
      }
    },
    created() {
      const { query, pagination } = this;
      const { sortBy } = pagination;

      this.getTrips({
        ...query,
        sort: sortBy
      });
    },
    methods: {
      getTrips({ page = 1, perPage = 15, order = 'asc', sort = '', origin = '', destination = '' } = {}) {
        const query = {
          page,
          perPage,
          order,
          sort,
          origin,
          destination
        };

        this.isLoading = true;
        this.pagination.descending = order === 'desc';

        if (sort !== '') {
          this.pagination.sortBy = sort;
        }

        return this.$store.dispatch('trips/getTrips', query)
          .then((res) => {
            this.isLoading = false;
            return res;
          })
          .catch((err) => {
            this.isLoading = false;
            return err;
          });
      },
      selectTrip(trip) {
        this.selectedTrip = trip;
        this.toggleEditTripModal();
      },
      displayColumnValue(item, columnValue) {
        return extractNestedProp(item, columnValue);
      },
      toggleEditTripModal() {
        this.isEditTripModalOn = !this.isEditTripModalOn;
      },
      toggleNewTripModal() {
        this.isAddTripModalOn = !this.isAddTripModalOn;
      },
      createTrip(trip) {
        this.isAddingTrip = true;
        return this.$store.dispatch('trips/createTrip', trip)
          .then((res) => {
            this.isAddingTrip = false;
            this.toggleNewTripModal();
            return res;
          })
          .catch((err) => {
            this.isAddingTrip = false;
            return err;
          });
      },
      updateTrip(trip) {
        const query = {
          id: this.selectedTrip.id,
          ...trip
        };

        this.isEditingTrip = true;
        return this.$store.dispatch('trips/updateTrip', query)
          .then((res) => {
            this.isEditingTrip = false;
            this.toggleEditTripModal();
            return res;
          })
          .catch((err) => {
            this.isEditingTrip = false;
            return err;
          });
      },
      onFilter(filters) {
        this.query = {
          ...this.query,
          ...this.getSearchQuery(filters)
        };

        this.getTrips(this.query);
      },
      onClearFilters() {
        const { sortBy } = this.pagination;
        this.query = { sort: sortBy };

        this.getTrips(this.query);
      },
      getSearchQuery({ origin, destination }) {
        const query = {};

        query.origin = origin;
        query.destination = destination;

        return query;
      },
      updatePagination({ page, descending, sortBy }) {
        const { query, pagination } = this;
        const nextQuery = {
          ...query,
          page,
          order: descending ? 'desc' : 'asc',
          sort: isStr(sortBy) ? sortBy : pagination.sortBy
        };

        this.query = nextQuery;

        this.getTrips(nextQuery);
      },
    },
    metaInfo() {
      return {
        title: 'Trips'
      };
    }
  };
</script>

<style lang="stylus">
  [data-view="trips"] {
    .view-wrapper {
      padding: 32px 0 0 0;
    }

    [data-component="table"] {
      .v-image {
        width: 80px;
        height: 80px;
        border-radius: 2px;

        .v-image__image.v-image__image--cover {
          background-size: contain;
        }
      }
    }
  }
</style>
