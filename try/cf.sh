if [ -z "$1" ]; then
  echo "Usage: $0 <module-name>"
  exit 1
fi

MODULE_NAME="$1"
nest g resource $MODULE_NAME
