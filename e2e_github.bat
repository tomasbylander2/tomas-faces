cd "C:\github\"
rmdir C:\github\E2E_runner /s /q
xcopy "tomas-faces" "E2E_runner" /i /s > null
cd E2E_runner
cd e2e-tests
del protractor.conf.js
del protractor_E2E1.conf.js
copy ..\..\protractor_e2e.conf.js protractor_e2e.conf.js
cd ..
protractor ./e2e-tests/protractor_e2e.conf.js