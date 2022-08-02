
replace the uml line with just the path
find: ^\{%.*(".*").*\n
replace: $1\n


Find all uml end tags:
find (plain): {% enduml %}
replace: 

Replace string with image ref:

find: ^".*plantuml"
replace: ![]($0)


