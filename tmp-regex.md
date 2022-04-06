
replace the uml line with just the path
^\{.*(".*").*\n



Replace string with image ref:

find: ^".*plantuml"
replace: ![]($0)


