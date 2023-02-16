client-server dedication service for siddur beit halevi

Currently you need to build locally and then push to azure.
npm run build (from master) will build and push the changes
then sync azure app service.

Todo: make it automatically:
a. download the kudu files:
    kudu -> tools -> download deployment script
b. edit if
c. save it in the root directory.