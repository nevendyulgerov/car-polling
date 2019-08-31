<template>
  <div data-view="trips">
    <AddTripDialog
      :is-on="isAddTripModalOn"
      :is-loading="isAddingTrip"
      :on-cancel="toggleNewTripModal"
      :on-confirm="createTrip"
    />

    <EditTripDialog
      :trip="selectedTrip"
      :is-on="isEditTripModalOn"
      :is-loading="isEditingTrip"
      :on-cancel="toggleEditTripModal"
      :on-confirm="updateTrip"
    />

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
          :has-custom-items-template="true"
          :can-edit-columns="false"
          :is-loading="isLoading"
          :on-select-item="selectTrip"
          :on-update-pagination="updatePagination"
          :on-change-page="onChangePage"
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
            <div v-if="isFlag(scope.cell.column.value)">
              <v-icon
                :color="scope.cell.item[scope.cell.column.value] ? 'success' : 'error'"
              >
                {{ scope.cell.item[scope.cell.column.value] ? 'check' : 'close' }}
              </v-icon>
            </div>
            <div v-else-if="scope.cell.column.value === 'departureTime'">
              {{ $moment(scope.cell.item.departureTime).format(dateFormat) }}
            </div>
            <div v-else-if="scope.cell.column.value === 'apply'">
              <v-btn
                v-if="canApplyForTrip(scope.cell.item)"
                :loading="isApplyingForTrip"
                @click="applyForTrip(scope.cell.item)"
              >
                {{ 'Apply' }}
              </v-btn>
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
                directions_car
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
  import AddTripDialog from '../../components/dialogs/trips/AddDialog';
  import EditTripDialog from '../../components/dialogs/trips/EditDialog';
  import { extractNestedProp, isStr } from '../../utils';
  import columns from '../../config/trips/columns';
  import dateFormat from '../../config/dateFormat';

  export default {
    components: {
      AddTripDialog,
      EditTripDialog,
      TripFilters
    },
    data() {
      return {
        columns,
        trips: [],
        pagination: {
          descending: true,
          page: 0,
          rowsPerPage: 15,
          sortBy: 'origin',
          totalItems: 0,
          search: ''
        },
        selectedTrip: {},
        totalPages: 0,
        query: {},
        dateFormat,
        isEditTripModalOn: false,
        isEditingTrip: false,
        isAddTripModalOn: false,
        isAddingTrip: false,
        isLoading: false,
        isApplyingForTrip: false
      };
    },
    computed: {
      loggedUser() {
        return this.$store.getters['auth/user'];
      },
      totalCount() {
        return this.trips.length;
      }
    },
    created() {
      this.getPassengerStatuses();
    },
    methods: {
      getPassengerStatuses() {
        return this.$store.dispatch('trips/getPassengerStatuses');
      },
      getTrips(options = {}) {
        const {
          driver = '',
          page = 0,
          perPage = 15,
          order = 'asc',
          sort = '',
          origin = '',
          destination = '',
          departureDates = '',
          availablePlaces = -1,
          smoking = '',
          luggage = '',
          pets = ''
        } = options;

        const query = {
          driver,
          page: page - 1,
          perPage,
          order,
          sort,
          origin,
          destination,
          departureDates,
          availablePlaces,
          smoking,
          luggage,
          pets
        };

        this.isLoading = true;
        this.pagination.descending = order === 'desc';

        if (sort !== '') {
          this.pagination.sortBy = sort;
        }

        return this.$store.dispatch('trips/getTrips', query)
          .then((res) => {
            const { items, itemsMeta } = res;
            this.trips = items;
            this.isLoading = false;
            this.pagination.page = itemsMeta.number + 1;
            this.pagination.totalItems = itemsMeta.totalElements;
            this.totalPages = itemsMeta.totalPages;

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
        this.getTrips(this.query);
      },
      toggleNewTripModal() {
        this.isAddTripModalOn = !this.isAddTripModalOn;
        this.getTrips(this.query);
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
          ...filters
        };

        this.getTrips(this.query);
      },
      onClearFilters() {
        const { sortBy } = this.pagination;
        this.query = { sort: sortBy };

        this.getTrips(this.query);
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
      onChangePage(page) {
        const { query, pagination } = this;
        const { descending, sortBy } = pagination;
        const nextQuery = {
          ...query,
          page,
          order: descending ? 'desc' : 'asc',
          sort: sortBy
        };

        this.query = nextQuery;

        this.getTrips(nextQuery);
      },
      isFlag(value) {
        return value === 'smoking'
          || value === 'pets'
          || value === 'luggage';
      },
      canApplyForTrip(trip) {
        const { loggedUser } = this;
        const { driver, passengersList } = trip;
        const passengerIds = passengersList.map(({ id }) => id);

        return driver.id !== loggedUser.id
          && passengerIds.indexOf(loggedUser.id) === -1;
      },
      applyForTrip(trip) {
        const query = {
          tripId: trip.id
        };

        this.isApplyingForTrip = true;

        return this.$store.dispatch('trips/applyForTrip', query)
          .then((res) => {
            this.trips = this.trips.map((t) => ({
              ...t,
              passengersList: t.id === trip.id
                ? [...t.passengersList, this.loggedUser]
                : t.passengersList
            }));
            this.isApplyingForTrip = false;
            return res;
          });
      }
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
