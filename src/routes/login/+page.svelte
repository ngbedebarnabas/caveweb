<script lang="ts">
  import {
    Row,
    Col,
    CardBody,
    Card,
    Container,
    Label,
    Input,
    Button,
  } from "sveltestrap";
  import { auth } from "$lib/helpers/store";
  import Auth from "$lib/graphql/auth";
  import { goto } from "$app/navigation";
    import { onMount } from "svelte"

  let email: string;
  let password: string;
  let visible = false;

  $: if ($auth.loggedIn) goto("/", { replaceState: true });
  $: if (visible) {
    setTimeout(() => {
      visible = false;
    }, 3000);
  }

  onMount(() => {

  })

  const handleLogin = () => Auth.queryPublic("signIn", { email, password });
</script>

<div class="home-btn d-none d-sm-block">
  <a href="https://adullam.ng/" class="text-dark">
    <i class="bx bx-home h2" />
  </a>
</div>
<div class="account-pages my-5 pt-sm-5">
  <Container>
    <Row class="justify-content-center">
      <Col md={8} lg={6} xl={5}>
        <Card class="overflow-hidden">
          <div class="bg-primary bg-soft">
            <Row>
              <Col class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p>Sign in to continue to Adullam.</p>
                </div>
              </Col>
              <Col class="col-5 align-self-end">
                <img
                  src="assets/images/profile-img.png"
                  alt=""
                  class="img-fluid"
                />
              </Col>
            </Row>
          </div>
          <CardBody class="pt-0">
            <div class="auth-logo">
              <a href="https://adullam.ng/" class="auth-logo-light">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img
                      src="assets/images/logo-light.svg"
                      alt=""
                      class="rounded-circle"
                      height="34"
                    />
                  </span>
                </div>
              </a>
              <a href="https://adullam.ng/" class="auth-logo-dark">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img
                      src="assets/images/logo.svg"
                      alt=""
                      class="rounded-circle"
                      height="34"
                    />
                  </span>
                </div>
              </a>
            </div>
            <div class="p-2">
              <div class="form-horizontal">
                <div class="mb-3">
                  <Label for="email" class="form-label">Email</Label>
                  <Input
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Enter username"
                    bind:value={email}
                  />
                </div>

                <div class="mb-3">
                  <Label class="form-label" for="password">Password</Label>
                  <div class="input-group auth-pass-inputgroup">
                    <Input
                      type={visible ? "text" : "password"}
                      class="form-control"
                      id="password"
                      placeholder="Enter password"
                      aria-label="Password"
                      aria-describedby="password-addon"
                      bind:value={password}
                    />
                    <Button
                      on:click={() => (visible = !visible)}
                      color="light"
                      type="button"
                      id="password-addon"
                      ><i
                        class={visible
                          ? "mdi mdi-eye-outline"
                          : "mdi mdi-eye-off-outline"}
                      /></Button
                    >
                  </div>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="remember-check"
                  />
                  <Label class="form-check-label" for="remember-check">
                    Remember me
                  </Label>
                </div>

                <div class="mt-3 d-grid">
                  <button
                    class="btn btn-primary w-md waves-effect waves-light"
                    on:click={handleLogin}>Log In</button
                  >
                </div>

                <div class="mt-4 text-center">
                  <h5 class="font-size-14 mb-3">Sign in with</h5>

                  <ul class="list-inline">
                    <li class="list-inline-item">
                      <a
                        href={"#"}
                        class="social-list-item bg-primary text-white border-primary"
                      >
                        <i class="mdi mdi-facebook" />
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href={"#"}
                        class="social-list-item bg-info text-white border-info"
                      >
                        <i class="mdi mdi-twitter" />
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href={"#"}
                        class="social-list-item bg-danger text-white border-danger"
                      >
                        <i class="mdi mdi-google" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="mt-4 text-center">
                  <a href="auth-recoverpw" class="text-muted"
                    ><i class="mdi mdi-lock me-1" /> Forgot your password?</a
                  >
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
        <div class="mt-5 text-center">
          <p>
            Don&apos;t have an account ?{" "}
            <a href="/signup/register" class="fw-medium text-primary">
              {" "}
              Signup now{" "}
            </a>{" "}
          </p>
          <p>
            © {new Date().getFullYear()} Skote. Crafted with{" "}
            <i class="mdi mdi-heart text-danger" /> by Themesbrand
          </p>
        </div>
      </Col>
    </Row>
  </Container>
</div>
