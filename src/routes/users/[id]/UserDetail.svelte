<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import profileImg from "$lib/assets/images/profile-img.png";
  import Breadcrumb from "$lib/common/Breadcrumb.svelte";
  import Document from "$lib/components/Account/Document.svelte";
  import ProfileInfo from "$lib/components/Account/ProfileInfo.svelte";
  import Referee from "$lib/components/ApplicationForm/Referee.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import user from "$lib/graphql/user";
  import { auth, userData } from "$lib/helpers/store";
  import { slide } from "svelte/transition";
  import {
    Alert,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Row,
  } from "sveltestrap";

  let alert: false;
  let subscribemodal = false;
  let complete: boolean;
  let active = 0;
  let isRef: boolean;
  let id: string;

  let menus: string[] = [
    // "Overview",
    "Profile",
    "Documents",
    // "Activity",
    // "Practicums",
    // "Settings",
  ];

  $: id = $page.params.id;
  const togglesubscribemodal = () => (subscribemodal = !subscribemodal);
  $: if (browser && !$userData.user?.id && !!id) user.query("user", { id });
</script>

{#if $userData.user?.id}
  <div class="page-content">
    <Container fluid>
      <Breadcrumb title="Contacts" breadcrumbItem="Profile" />
      {#if alert}
        <div transition:slide={{ duration: 500 }}>
          <Alert
            color="info"
            class="alert-dismissible fade show mb-4"
            role="alert"
          >
            <div class="d-flex">
              <i class="mdi mdi-alert-circle-outline me-2 fs-1" />
              <p class="my-auto">
                A maximum of two referees are reqiured, please click on
                <button
                  on:click={() => (isRef = true)}
                  class="btn btn-link alert-link p-0">Add Referee</button
                >
                to add another referee in order to complete your Adullam Application
              </p>
            </div>
          </Alert>
        </div>
      {/if}

      <Row>
        <Col xl="4">
          <Card class="overflow-hidden">
            <div class="bg-primary bg-soft">
              <Row>
                <Col xs="7">
                  <div class="text-primary p-3">
                    <h5 class="text-primary">Welcome Back !</h5>
                    <!-- <p>RCN Theological Seminary - Adullam</p> -->
                  </div>
                </Col>
                <Col xs="5" class="align-self-end">
                  <img src={profileImg} alt="" class="img-fluid" />
                </Col>
              </Row>
            </div>
            <CardBody class="pt-0">
              <Row>
                <Col sm="4">
                  <div class="avatar-md profile-user-wid mb-4">
                    {#if !$userData.user?.avatarUrl}
                      <span class="avatar-title fs-1 rounded-circle">
                        {$userData.user?.fullName.charAt(0)}
                      </span>
                    {:else}
                      <img
                        class="img-thumbnail rounded-circle"
                        src={$userData.user?.avatarUrl}
                        alt=""
                      />
                    {/if}
                  </div>
                  <h5 class="font-size-15 text-truncate">
                    {$userData.user?.fullName}
                  </h5>
                  <p class="text-muted mb-0 text-truncate text-capitalize">
                    {$userData.user?.role}
                  </p>
                </Col>

                <Col sm={8}>
                  <div class="pt-4">
                    <Row>
                      <Col xs="6">
                        <h5 class="font-size-15 text-capitalize">{$userData.user?.program}</h5>
                        <p class="text-muted mb-0">Program</p>
                      </Col>
                      <Col xs="6">
                        <h5 class="font-size-15">{$userData.user?.platform}</h5>
                        <p class="text-muted mb-0">Platform</p>
                      </Col>
                    </Row>
                    {#if $auth.cred?.role == "prospective"}
                      <div class="mt-4">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm"
                          on:click={togglesubscribemodal}
                        >
                          Edit Profile
                          <i class="mdi mdi-arrow-right ms-1" />
                        </button>
                      </div>
                    {/if}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <CardTitle class="mb-4 h4">Referees</CardTitle>
              <Referee bind:complete bind:alert bind:isRef />
            </CardBody>
          </Card>
        </Col>

        <Col xl="8">
          <!-- <Row>
            <Col md={4}>
              <Card class="mini-stats-wid">
                <CardBody>
                  <MiniStats name="Completed Courses" stat="0">
                    <i slot="icon" class="bx bx-check-circle font-size-24" />
                  </MiniStats>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card class="mini-stats-wid">
                <CardBody>
                  <MiniStats name="Pending Courses" stat="0">
                    <i slot="icon" class="bx bx-hourglass font-size-24" />
                  </MiniStats>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card class="mini-stats-wid">
                <CardBody>
                  <MiniStats name="New Converts" stat="0">
                    <i slot="icon" class="bx bx-package font-size-24" />
                  </MiniStats>
                </CardBody>
              </Card>
            </Col>
          </Row> -->
          <div class="mt-4">
            <Tabs {menus} {active}>
              <!-- <div slot="id-1">
                <Overview />
              </div> -->
              <div slot="id-1">
                <ProfileInfo />
              </div>
              <div slot="id-2">
                <Document userId={$page.params?.id ?? $auth.cred?.id} />
              </div>
            </Tabs>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
{/if}
