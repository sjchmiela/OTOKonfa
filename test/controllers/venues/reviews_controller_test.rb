require 'test_helper'

class Venues::ReviewsControllerTest < ActionController::TestCase
  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get update" do
    get :update
    assert_response :success
  end

  test "should get destroy" do
    get :destroy
    assert_response :success
  end

  test "should get accept" do
    get :accept
    assert_response :success
  end

  test "should get edit" do
    get :edit
    assert_response :success
  end

end
